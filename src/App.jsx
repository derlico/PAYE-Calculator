import { useState } from 'react'
import './App.css'
import Info from './components/Info'
import NssfApp from './components/NssfApp'
import PAYE from './components/PAYE'

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
  

  const displayPAYE = () => {
    setShowPAYE(true)
  }

  const undisplayPAYE = () => {
    setShowPAYE(false)
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

  const calculateNSSF = (salary, nssfRate) =>{
    if (nssfRate == 'tier-1'){
      setTier2(false)
      if (salary >= 18000){ 
        return 1080
      }else{
        return 720
      }
    }else{
      setTier2(true)
      if (salary >= 18000){ 
        
        return 1080
      }else{
        return 360
      }
    }
    
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const salary = e.target.gross.value
    const nhif = e.target.nhif.value || 0
    const nssfRate = e.target.nssf.value
    
    const nssf = calculateNSSF(salary, nssfRate)

    const mortgage = e.target.mortgage.value || 0
    const insurance = e.target.insurance.value || 0

    if (salary < firstLimit){
      alert("Taxable Salary is at least 24000 p/m")
    }

    if (nhif || nssf || mortgage || insurance){
        if (nssf <= NSSF_LIMIT ){
          const gross = salary - nssf
          displayPAYE()
          setPAYE(calculatePAYE(gross))
        }else{
          alert("Above the Allowable limit!")
        }
       
    } else {
      const gross = salary
      displayPAYE()
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
                
                  <Info />
                  
                </div>
                
                <div className="col-lg-6 col-md-12 col-sm-12 form-group">
                 
                  
                  <NssfApp />
                

                  <label htmlFor="nssf">NHIF Contribution</label>
                  <input type="number" className='form-control' id="nhif" />
 
                  <label htmlFor="mortgage">Mortgage Interests (if any)</label>
                  <input type="number" className='form-control' id="mortgage" />
                  
                  <label htmlFor="relief">Insurance Relief (if any)</label>
                  <input type="number" className='form-control' id="insurance" />

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
                  
                  { showPAYE ?
                  (
                    <PAYE paye={paye} togglePAYE={undisplayPAYE}/>
                    ) : null 
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
