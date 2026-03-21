import { useState } from "react";

export default function BudgetForm(props) {

  const { onSubmit, budget, setBudget } = props;
  const [budgetError, setBudgetError] = useState('')

  function handleBudgetChange(e) {
    setBudgetError('')
    const value = e.target.value;

    if (value > 0) {
      setBudget(e.target.value)
    } else {
      setBudget('')
      setBudgetError('Please input valid budget amount')
    }
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <form className="w-25 " onSubmit={onSubmit}>
        <h3 className="mb-3 display-4">Input Budget</h3>
        <div className="card mx-auto" style={{ maxWidth: "500px" }}>
          <div className="card-body">
            <input
              className={`form-control mx-auto mt-3 w-75 ${budgetError ? "is-invalid" : ""}`}
              value={budget}
              placeholder="Budget "
              onChange={handleBudgetChange}
            />
            {budgetError && <div className="invalid-feedback">{budgetError}</div>}
            <button id="buttons" className="btn mt-4 mb-3 w-50" disabled={budgetError ? true : false}>Confirm</button>
          </div>
        </div>
      </form>
    </div>
  )
}