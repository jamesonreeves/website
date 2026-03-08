import requests
from bs4 import BeautifulSoup
import os
import json
import time
import re

URL = "https://www.jamesonreeves.com"
IMAGE_DIR = "public/assets"

def download_image(url, filename):
    if not url:
        return False
    try:
        response = requests.get(url, stream=True, timeout=10)
        if response.status_code == 200:
            os.makedirs(IMAGE_DIR, exist_ok=True)
            with open(os.path.join(IMAGE_DIR, filename), 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
    return False

def get_project_details(project_url, thumb_title):
    print(f"  Scraping project page: {project_url}...")
    try:
        response = requests.get(project_url, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Title - look for h1 in content first, avoiding the logo
        content_divs = soup.find_all('div', class_='sqs-html-content')
        title = ""
        for div in content_divs:
            h1 = div.find('h1')
            if h1:
                title = h1.get_text(strip=True)
                break
        
        if not title or title.lower() == "jameson reeves":
            title = thumb_title
        
        # Description
        description = ""
        for div in content_divs:
            # Get all text but try to exclude the h1 we just used as title
            paragraphs = div.find_all(['p', 'h2', 'h3', 'li'])
            texts = [p.get_text(strip=True) for p in paragraphs]
            if texts:
                description += " ".join(texts) + " "
            
        description = description.strip()
            
        # If description is still empty, try meta description
        if not description:
            meta_desc = soup.find('meta', attrs={'name': 'description'})
            description = meta_desc['content'] if meta_desc else ""

        # Images on the page
        page_images = []
        for img in soup.find_all('img'):
            src = img.get('data-src') or img.get('src')
            if src and 'squarespace-cdn' in src:
                clean_src = src.split('?')[0]
                page_images.append(clean_src)
                
        return title, description, page_images
    except Exception as e:
        print(f"  Error scraping {project_url}: {e}")
        return thumb_title, "", []

def scrape_portfolio():
    print(f"Scraping homepage {URL}...")
    response = requests.get(URL)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    projects = []
    project_thumbs = soup.find_all('a', class_='project')
    
    print(f"Found {len(project_thumbs)} project links. Processing...")
    
    for i, thumb in enumerate(project_thumbs):
        relative_url = thumb.get('href')
        if not relative_url:
            continue
            
        project_url = URL + relative_url
        thumb_title_tag = thumb.find('div', class_='project-title')
        thumb_title = thumb_title_tag.get_text(strip=True) if thumb_title_tag else f"Project {i}"
        
        img_tag = thumb.find('img')
        thumb_src = img_tag.get('data-src') or img_tag.get('src') if img_tag else None
        
        actual_title, description, page_images = get_project_details(project_url, thumb_title)
        
        title = actual_title if actual_title else thumb_title
        
        main_image_url = page_images[0] if page_images else thumb_src
        
        # Handle title/category splitting if it's like "Title / Category"
        category = "Strategic Finance" # Default or placeholder
        if " / " in title:
            parts = title.split(" / ")
            title = parts[0].strip()
            category = parts[1].strip()
        elif " : " in title:
            parts = title.split(" : ")
            title = parts[0].strip()
            category = parts[1].strip()
        elif ":" in title:
            parts = title.split(":")
            title = parts[0].strip()
            category = parts[1].strip()
        elif "Selection" in title:
            category = "Photography"

        clean_name = re.sub(r'[^a-zA-Z0-9]', '_', title.lower()).strip('_')
        filename = f"{clean_name}.jpg" if clean_name else f"project_{i}.jpg"

        print(f"  Downloading image for {title} (Filename: {filename})...")
        image_path = f"/assets/{filename}"
        if not download_image(main_image_url, filename):
            image_path = ""

        projects.append({
            "id": relative_url.strip('/'),
            "title": title,
            "description": description[:300] + ("..." if len(description) > 300 else ""),
            "full_description": description,
            "category": category,
            "image": image_path,
            "tags": ["Imported", "Squarespace"],
            "url": project_url
        })
        time.sleep(1)

    return projects

if __name__ == "__main__":
    imported_projects = scrape_portfolio()
    
    # Load existing projects
    existing_path = "src/data/projects.json"
    existing_projects = []
    if os.path.exists(existing_path):
        with open(existing_path, 'r') as f:
            existing_projects = json.load(f)
    
    # Keep only manual/existing ones that aren't already being imported
    imported_ids = [p['id'] for p in imported_projects]
    filtered_existing = [p for p in existing_projects if p.get('id') not in imported_ids and not p.get('id', '').startswith('imported')]
    
    all_projects = filtered_existing + imported_projects
    
    with open(existing_path, 'w') as f:
        json.dump(all_projects, f, indent=2)
        
    print(f"Successfully imported {len(imported_projects)} projects with full content.")
