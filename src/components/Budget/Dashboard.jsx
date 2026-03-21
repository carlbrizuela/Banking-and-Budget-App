import { useState } from "react";
import AddExpense from "./AddExpense";
import DisplayChart from "./DisplayChart";
import EditExpense from "./EditExpense";
import "bootstrap/dist/css/bootstrap.min.css"
import EditBudget from "./EditBudget";

function Dashboard(props) {

  const { budget, setBudget } = props
  const [expenseList, setExpensesList] = useState([]);
  const [data, setData] = useState([])
  const [expenseToEdit, setExpenseToEdit] = useState({})
  const [showChart, setShowChart] = useState(false)
  const [showEditExpense, setShowEditExpense] = useState(false)
  const [showEditBudget, setShowEditBudget] = useState(false)

  function handleDeleteExpense(expenseId) {
    setExpensesList((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId))

    expenseList.forEach((expense) => {
      if (expense.id === expenseId) {
        setBudget((prev) => prev + Number(expense.amount))

        const checkLegend = expenseList.filter((prevList) => prevList.category === expense.category)

        if (checkLegend.length === 1) {
          setData((prevData) => prevData.filter((legend) => legend.label !== expense.category))
        } else {
          const updateLegend = data.map((cat) => {
            if (cat.label === expense.category) {
              return { ...cat, value: cat.value - expense.amount }
            } else {
              return cat
            }
          })
          setData(updateLegend)
        }
      }
    })
  }

  function handleEditExpense(expenseId) {
    const newExpense = expenseList.filter((expense) => expense.id === expenseId)
    setExpenseToEdit(newExpense[0])
    setShowEditExpense(true)
  }



  return (
    <div className="container mt-4 d-flex flex-column mx-auto w-100">
      <div className={`row card text-white ${budget > 0 ? "bg-success" : "bg-danger"} mb-3 w-25 mx-auto`}>
        <div className="card-body">
          <h5 className="card-title">Current Budget: </h5>
          <p className="card-text fs-4">Php {Number(budget).toFixed(2)}
            <span className="actionButton ps-2" onClick={() => setShowEditBudget(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
              </svg>
            </span>
          </p>
        </div>
      </div>
      <div className="d-flex mt-3 w-100 gap-2">
        <div className="text-center mb-4 col-5">
          <AddExpense expenseList={expenseList} setExpensesList={setExpensesList} setBudget={setBudget} setData={setData} data={data} />
        </div>
        <div className="col-7">
          <div id="expense-table" className="table-responsive d-flex justify-content-center">
            <table className="table table-striped table-bordered w-100 align-middle">
              <thead className="table-dark">
                <tr>
                  <th width="35%">Category</th>
                  <th width="30%">Item</th>
                  <th width="20%">Amount</th>
                  <th width="15%">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenseList.length === 0 && <tr style={{ height: "100px" }}><td colSpan={4}><i>No recorded expenses</i></td></tr>}
                {
                  expenseList.map((expense) => {
                    return (
                      <tr key={expense.id}>
                        <td>{expense.category}</td>
                        <td>{expense.item}</td>
                        <td>Php {expense.amount.toFixed(2)}</td>
                        <td className="d-flex flex-row justify-content-evenly">
                          <div className="actionButton" onClick={() => handleEditExpense(expense.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                          </div>
                          <div className="actionButton" onClick={() => handleDeleteExpense(expense.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                            </svg>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
          {expenseList.length !== 0 && <button id="chart-button" className="btn" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => setShowChart(true)}>Display Chart</button>}
        </div>
      </div>

      {showEditExpense && <EditExpense expenseToEdit={expenseToEdit} expenseList={expenseList} setExpensesList={setExpensesList} setShowEditExpense={setShowEditExpense} setBudget={setBudget} setData={setData} data={data} />}

      {showChart && <DisplayChart data={data} setShowChart={setShowChart} />}

      {showEditBudget && <EditBudget setBudget={setBudget} setShowEditBudget={setShowEditBudget} />}

    </div>

  );
}

export default Dashboard;
