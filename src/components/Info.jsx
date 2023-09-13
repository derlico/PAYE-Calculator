import React from 'react'

export default function Info() {
  return (
    <div className="card border-info">
    <div className="card-header pb-0 bg-info text-white">
     <h5 className='card-title'>Important Note</h5>
    </div>
    <ul>
      <li><a href="https://www.nssf.or.ke/download/new-nssf-rates/">NSSF rates</a> included<b> Allowable: </b><i>Ksh 20,000 p/m. </i> All pension in excess incur taxes under <a href="https://www.kra.go.ke/individual/filing-paying/types-of-taxes/paye/">KRA rates</a></li>
      <li>Mortgage Contributions <b>Limit: </b><i>Ksh 20,000 p/m</i></li>
      <li>Insurance Relief @15% of premium or <b>Limit of </b><i>Ksh 60,000 per year</i></li>
      <br />

      <li> <b>Current MPR: </b>Ksh 2,400 p/m</li>
    </ul>

    
    
  </div>
  )
}
