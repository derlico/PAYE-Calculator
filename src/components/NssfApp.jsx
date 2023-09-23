import React from 'react'
import { Button } from 'react-bootstrap'
import { useState } from 'react'

export default function NssfApp() {

  const [tier2, setTier2] = useState(false)

  function addTier2(){
    setTier2(!tier2)
  }
    
  return (
    <>
        <label htmlFor="nssf">Pension Contribution (NSSF)</label>
        <br />
        <div className="form-check form-switch">
            
            <input className="form-check-input" type="radio" name='nssf' value={'tier-1'} defaultChecked/>
            <label className="form-check-label" htmlFor="nssf"> NSSF Tier 1</label>
            <br />
            <input className="form-check-input" type="radio" name='nssf' value={'tier1-2'}/>
            <label className="form-check-label" htmlFor="nssf"> NSSF Tier 1 & 2</label>
            { !tier2 ?
            (
            <Button variant='link' onClick={addTier2}>Add Tier 2</Button>
            ) : null 
            }

            { tier2 ?
            (
            <Button variant='link' onClick={addTier2}>Close</Button>
            ) : null 
            }
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
