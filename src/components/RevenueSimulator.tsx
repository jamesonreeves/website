import React, { useState, useEffect } from 'react';

type DistributionType = 'log' | 's-curve' | 'linear';

const RevenueSimulator: React.FC = () => {
  const [startingARR, setStartingARR] = useState(2000000);
  const [numOpps, setNumOpps] = useState(20);
  const [winRate, setWinRate] = useState(25);
  const [dealSize, setDealSize] = useState(45000);
  const [timeToClose, setTimeToClose] = useState(3);
  const [distributionType, setDistributionType] = useState<DistributionType>('log');
  
  const [projection, setProjection] = useState<number[]>([]);

  useEffect(() => {
    const months = 12;
    const totalCohortARR = numOpps * (winRate / 100) * dealSize;

    // Generate Weights based on selected distribution
    const weights: number[] = [];
    let weightSum = 0;

    for (let t = 1; t <= timeToClose; t++) {
      let w = 1;
      if (distributionType === 'log') {
        // Front-loaded
        w = Math.log(1 + (timeToClose - t + 1));
      } else if (distributionType === 's-curve') {
        // Slow start, fast middle, slow end (Bell curve-ish)
        const x = (t - 0.5) / timeToClose; // 0 to 1
        w = Math.exp(-Math.pow(x - 0.5, 2) / 0.08); // Normal distribution centered at 0.5
      } else if (distributionType === 'linear') {
        // Evenly distributed
        w = 1;
      }
      weights.push(w);
      weightSum += w;
    }
    const normalizedWeights = weights.map(w => w / weightSum);

    const arrState = new Array(months + 1).fill(startingARR);

    for (let m = 1; m <= months; m++) {
      let monthlyClosedFromAllCohorts = 0;
      for (let t = 1; t <= timeToClose; t++) {
        const cohortStartMonth = m - t + 1;
        if (cohortStartMonth >= 1) {
          monthlyClosedFromAllCohorts += totalCohortARR * normalizedWeights[t - 1];
        }
      }
      arrState[m] = arrState[m - 1] + monthlyClosedFromAllCohorts;
    }

    setProjection(arrState.map(val => Math.round(val)));
  }, [startingARR, numOpps, winRate, dealSize, timeToClose, distributionType]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div style={{ 
      backgroundColor: '#fdfdfd', 
      padding: '2.5rem', 
      border: '1px solid var(--charcoal)',
      marginTop: '2rem',
      fontFamily: 'var(--font-mono)',
      color: 'var(--charcoal)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
        <div>
          <h4 style={{ margin: 0, color: 'var(--cobalt)', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
            ADVANCED REVENUE ENGINE
          </h4>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            [ MODEL ID: REV-ARCH-002 // CURVE: {distributionType.toUpperCase()} ]
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.65rem', display: 'block', color: 'var(--text-muted)' }}>12-MONTH ARR FORECAST</span>
          <span style={{ fontSize: '1.75rem', fontWeight: 700 }}>{formatCurrency(projection[12] || 0)}</span>
        </div>
      </div>

      <div style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-subtle)', pb: '2rem' }}>
        <label style={{ display: 'block', fontSize: '0.65rem', marginBottom: '1rem', color: 'var(--cobalt)' }}>
          DISTRIBUTION TYPE
        </label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {(['log', 's-curve', 'linear'] as DistributionType[]).map((type) => (
            <button
              key={type}
              onClick={() => setDistributionType(type)}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                backgroundColor: distributionType === type ? 'var(--cobalt)' : 'transparent',
                color: distributionType === type ? 'white' : 'var(--text-muted)',
                border: '1px solid ' + (distributionType === type ? 'var(--cobalt)' : 'var(--border-subtle)'),
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {type.toUpperCase().replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
        <div className="input-group">
          <label style={{ display: 'block', fontSize: '0.65rem', marginBottom: '0.75rem', color: 'var(--cobalt)' }}>
            STARTING ARR // {formatCurrency(startingARR)}
          </label>
          <input type="range" min="0" max="10000000" step="100000" value={startingARR} onChange={(e) => setStartingARR(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--cobalt)' }} />
        </div>

        <div className="input-group">
          <label style={{ display: 'block', fontSize: '0.65rem', marginBottom: '0.75rem', color: 'var(--cobalt)' }}>
            MONTHLY OPPS // {numOpps}
          </label>
          <input type="range" min="1" max="100" step="1" value={numOpps} onChange={(e) => setNumOpps(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--cobalt)' }} />
        </div>

        <div className="input-group">
          <label style={{ display: 'block', fontSize: '0.65rem', marginBottom: '0.75rem', color: 'var(--cobalt)' }}>
            WIN RATE // {winRate}%
          </label>
          <input type="range" min="1" max="100" step="1" value={winRate} onChange={(e) => setWinRate(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--cobalt)' }} />
        </div>

        <div className="input-group">
          <label style={{ display: 'block', fontSize: '0.65rem', marginBottom: '0.75rem', color: 'var(--cobalt)' }}>
            AVG DEAL SIZE // {formatCurrency(dealSize)}
          </label>
          <input type="range" min="5000" max="250000" step="5000" value={dealSize} onChange={(e) => setDealSize(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--cobalt)' }} />
        </div>

        <div className="input-group">
          <label style={{ display: 'block', fontSize: '0.65rem', marginBottom: '0.75rem', color: 'var(--cobalt)' }}>
            TIME TO CLOSE // {timeToClose} MONTHS
          </label>
          <input type="range" min="1" max="12" step="1" value={timeToClose} onChange={(e) => setTimeToClose(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--cobalt)' }} />
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', height: '140px', gap: '4px' }}>
          {projection.map((val, i) => {
            const maxVal = Math.max(...projection);
            const height = (val / maxVal) * 100;
            return (
              <div key={i} style={{ 
                flex: 1, 
                height: `${height}%`, 
                backgroundColor: i === 0 ? 'rgba(0,0,0,0.1)' : 'var(--cobalt)',
                transition: 'height 0.3s ease',
                position: 'relative'
              }}>
                <span style={{ 
                  position: 'absolute', 
                  bottom: '-20px', 
                  left: '50%', 
                  transform: 'translateX(-50%)', 
                  fontSize: '0.5rem',
                  color: 'var(--text-muted)'
                }}>M{i}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      <div style={{ marginTop: '3rem', fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        * NOTE: REVENUE IS DISTRIBUTED USING A {distributionType.toUpperCase()} {timeToClose}-MONTH CLOSING WINDOW.
      </div>
    </div>
  );
};

export default RevenueSimulator;
