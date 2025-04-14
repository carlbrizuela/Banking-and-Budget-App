import { useState } from "react";
import Dashboard from "./Dashboard";

function HomeBudget(){

   const [budget, setBudget] = useState('');
   const [budgetError, setBudgetError] = useState('')
   const [showDashboard, setShowDashboard] = useState(false)

   function displayBudget(event){
      event.preventDefault();
      if(budget > 0 && budget){
         setShowDashboard(true);
      }else{
         setBudgetError("Please input valid budget amount")
   	   setBudget('')
   	}
   }

   return(
      <div>
         { !showDashboard && 
            <div className="d-flex justify-content-center mt-5">
                  <form className="w-25 "onSubmit={displayBudget}>
                     <h3 className="mb-3 display-4">Input Budget</h3>
                     <input className={`form-control ${budgetError ? "is-invalid": ""}`} value = {budget} placeholder="Budget " 
                        onChange={(event) => {
                           setBudget(event.target.value)
                           setBudgetError('')}
                     }></input>
                     { budgetError && <div className="invalid-feedback">{budgetError}</div>}
                     <button className="btn btn-primary mt-2">Confirm</button>
                  </form>
            </div>
         }
         { showDashboard && <Dashboard budget={budget} setBudget={setBudget}/> }
      </div>
   )
}

export default HomeBudget
