import React from 'react'

export default function PAYE({paye, togglePAYE}) {
  return (
    <>
        <hr />
        <div className="container">
        <div className="row no-gutters">
    
        <div className="alert alert-success fade show" role='alert'>
            <button type="button" className='close' data-dismiss='alert' aria-label='Close' onClick={togglePAYE}>
                <span aria-hidden="true">&times;</span>
            </button>
            <h4 className='alert-heading'>PAYE Calculation Success</h4>
            PAYE: {paye.toFixed(2)}
        </div>
        </div>
        </div>
    </> 
  )
}
