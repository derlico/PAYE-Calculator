import React from 'react'

export default function NssfApp({tier2, setTier2}) {
    
  return (
    <>
        <label htmlFor="nssf">Pension Contribution (NSSF)</label>
        <br />
        <div className="form-check form-switch">
            
            <input className="form-check-input" type="radio" name='nssf' value={'tier-1'} defaultChecked/>
            <label className="form-check-label" htmlFor="nssf"> NSSF Tier 1</label>
            <br />
            <input className="form-check-input" type="radio" name='nssf' value={'tier1-2'} onChange={setTier2(true)}/>
            <label className="form-check-label" htmlFor="nssf"> NSSF Tier 1 & 2</label>
            
        </div>
        { tier2 ?
            (
                <>
                <label htmlFor="nssfetra">Enter Tier II Contribution</label>
                <input className="form-control" type="number" name='nssfetra' /> 
                </>
            ) : null 
        }
        
    </>
  )
}
