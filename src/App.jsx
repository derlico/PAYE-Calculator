import { useState } from 'react'
import './App.css'

function App() {
  
  /* -----------------------NSSF VARIABLES------------------------------- */

  const upperEarningLimit = 18000
  const lowerEarningLimit = 6000



   /* -----------------------STATUTORY LIMITS------------------------------- */
    const NSSF_LIMIT = 20000;
    const MORTGAGE_LIMIT = 20000;
    const INSURANCE_RELIEF_LIMIT = 5000;


 /* -----------------------MONTHLY TAX CONSTANTS------------------------------- */

  /* TAX LIMITS */
  const firstLimit = 24000;
  const secondLimit = 8333;
  const thirdLimit = 467667;
  const fourthLimit = 300000;
  const fifthLimit = 800000;

  /* TAX GROUPS */
  const firstTax = 0.1;
  const secondTax = 0.25;
  const thirdTax = 0.3;
  const fourthTax = 0.325;
  const fifthTax = 0.35;

  /* TAX RELIEF */
  const TAX_RELIEF = 2400;

  /* ----------------------------------------------------------------------------- */

  const [showPAYE, setShowPAYE] = useState(false)
  const [paye, setPAYE] = useState(0)

  const togglePAYE = () => {
    setShowPAYE(!showPAYE)
  }

  let tax = 0;

  function calculatePAYE(gross){
    let currentGross = gross;

    /* TAX BRACKET 1 */
    if (gross == firstLimit ){
      tax = firstLimit * firstTax
      
    }else if (gross < firstLimit){
      tax = gross * firstTax
    }else {
        tax = firstLimit * firstTax
        currentGross = gross - firstLimit

      /*  TAX BRACKET 2 */
      if (currentGross <= secondLimit){
        tax = tax + (currentGross * secondTax)
        
      }else{
        currentGross = currentGross - secondLimit
        tax = tax + (secondLimit * secondTax)
        

        /*  TAX BRACKET 3 */
        if (currentGross <= thirdLimit){
          tax = tax + (currentGross * thirdTax)
          
        }else{
          currentGross = currentGross - thirdLimit
          tax = tax + (thirdLimit * thirdTax)
          

          /*  TAX BRACKET 4 */
          if (currentGross <= fourthLimit){
            tax = tax + (currentGross * fourthTax)
            
          }else{
            currentGross = currentGross - fourthLimit
            tax = tax + (fourthLimit * fourthTax)
            

          /* TAX BRACKET 5 */
          if (currentGross > 0){
            tax = tax + (currentGross * fourthTax)
          }
        }
      }

    }
  }

  const total_tax = tax.toFixed(2) - TAX_RELIEF

  if (total_tax < 0){
    return 0;
  }

  return total_tax
  
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const salary = e.target.gross.value
    const nhif = e.target.nhif.value || 0
    const nssf = e.target.nssf.value || 1080
    

    const mortgage = e.target.mortgage.value || 0
    const insurance = e.target.insurance.value || 0

    if (salary < firstLimit){
      alert("Taxable Salary is at least 24000 p/m")
    }

    if (nhif || nssf || mortgage || insurance){
        if (nssf <= NSSF_LIMIT ){
          const gross = salary - nssf
          togglePAYE()
          setPAYE(calculatePAYE(gross))
        }else{
          alert("Above the Allowable limit!")
        }
       
    } else {
      const gross = salary
      togglePAYE()
      setPAYE(calculatePAYE(gross))
    }
 
    
  }

  return (
    <>
     <div className="container-fluid ">
      <div className="row my-4">
        <div className="col-lg-6 col-md-10 col-sm-12 col-xs-12 mb-md-0 mb-4 mx-auto">
          <div className="card h-100 min-vh-60">
            <div className="card-header pb-1 bg-success text-light">
              <div className="row">
              
                <h4 className='card-title'>Pay As You Earn - Calculator</h4>
                
              </div>
            </div>
            <div className="card-body pb-2 h-100 min-vh-60">
              <form onSubmit={handleSubmit}>
                <div className="row flex-fill">
                <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="form-group">
                    <label htmlFor="gross">Gross Salary</label>
                    <input type="number" className='form-control' id="gross" />
                    <br />
                </div>
                
                <div className="card border-info">
                    <div className="card-header pb-0 bg-info text-white">
                     <h5 className='card-title'>Important Note</h5>
                    </div>
                    <ul>
                      <li>Include <a href="https://www.nssf.or.ke/download/new-nssf-rates/">NSSF rates</a> are included<b> Allowable Limit: </b><i>Ksh 20,000 per month. </i> All pension in excess incur taxes under <a href="https://www.kra.go.ke/individual/filing-paying/types-of-taxes/paye/">KRA rates</a></li>
                      <li>Mortgage Contributions as per the Income Tax Act. <b>Current Limit: </b><i>Ksh 20,000 per month</i></li>
                      <li>Insurance Relief @15% of premium or <b>Limit of </b><i>Ksh 60,000 per year</i></li>
                    </ul>
                    
                  </div>
                  
                </div>
                
                <div className="col-lg-6 col-md-12 col-sm-12 form-group">
                  <label htmlFor="nssf">Pension Contribution (NSSF)</label>
                  <br />
                  
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="radio" name='nssf' value={1080} defaultChecked/>
                    <label className="form-check-label" htmlFor="nssf"> NSSF Tier 1 & 2</label>
                    <br />
                    <input className="form-check-input" type="radio" name='nssf' value={360}/>
                    <label className="form-check-label" htmlFor="nssf"> NSSF Tier 1</label>
                  </div>
                

                  <label htmlFor="nssf">NHIF Contribution</label>
                  <input type="number" className='form-control' id="nhif" />
 
                  <label htmlFor="mortgage">Mortgage Interests (if any)</label>
                  <input type="number" className='form-control' id="mortgage" />
                  
                  <label htmlFor="relief">Insurance Relief (if any)</label>
                  <input type="number" className='form-control' id="insurance" />

                  <br />

                  <p> <b>Current MPR: </b>Ksh 2,400 p/m</p>

                </div>
                

                {/* <div className="form-group">
                  <input type="checkbox" className='form-check-input' name="" id="" />
                  <label htmlFor="check">Auto</label>
                </div> */}
               
                  <div className='mb-2'>{' '}</div>
                  <div className='mb-2'>{' '}</div>
                  
                  <hr />
                  <div className="d-flex justify-content-center">
                    <button  className='btn btn-success w-50 mb-3'>Calculate PAYE</button>
                  </div>
                  <br />
                  <hr />
                  { showPAYE ?
                  (<div className="container">
                  <div className="row no-gutters">
    
                    <div className="alert alert-success fade show" role='alert'>
                      <button type="button" className='close' data-dismiss='alert' aria-label='Close' onClick={togglePAYE}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <h4 className='alert-heading'>PAYE Calculation Success</h4>
                      PAYE: {paye.toFixed(2)}
                    </div>
                  </div>
                  </div> ) : null 
                }
                  
                  
                  
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
