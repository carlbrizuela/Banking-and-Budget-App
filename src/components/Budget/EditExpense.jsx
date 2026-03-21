import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"

function EditExpense(props) {

  const { expenseToEdit, expenseList, setExpensesList, setShowEditExpense, setBudget, setData, data } = props
  const { id, category, item, amount } = expenseToEdit
  const [newCategory, setNewCategory] = useState(category);
  const [newItem, setNewItem] = useState(item);
  const [newAmount, setNewAmount] = useState(amount);

  function editExpenseHandler(event) {
    event.preventDefault()

    if (newCategory && newItem && newAmount && Number(newAmount) > 0) {
      const editedExpense = {
        id: id,
        category: newCategory,
        item: newItem,
        amount: Number(newAmount)
      }

      const editedExpenseList = expenseList.map((expense) => {
        if (expense.id === id) {
          return editedExpense
        } else {
          return expense
        }
      })

      const updateLegend = data.map((cat) => {
        if (cat.label === editedExpense.category) {
          return { ...cat, value: cat.value + (newAmount - amount) }
        } else {
          return cat
        }
      })

      setData(updateLegend)
      setExpensesList(editedExpenseList)
      setBudget((prev) => prev + (amount - newAmount))
    }

    setNewCategory('')
    setNewItem('')
    setNewAmount('')
    setShowEditExpense(false)
  }
  function onClick() {
    setShowEditExpense(false)
  }

  return (
    <div className="modal" style={{ display: "block" }} >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content w-100 pt-0">
          <div className='modal-header d-flex flex-row justify-content-center w-100 pt-0 pb-2'>
            <h3>Edit Expense</h3>
            <span className="closeButton fs-2" onClick={onClick}>&times;</span>
          </div>


          <div className="row">
            <div className="col form-floating p-0">

              <select disabled className="form-select" id="newCategory" value={newCategory} onChange={(event) => setNewCategory(event.target.value)} >
                <option style={{ display: 'none' }}> Choose Category </option>
                <option>Food and Beverage</option>
                <option>Transportation</option>
                <option>Bills and Utilities</option>
                <option>Medical and Healthcare</option>
                <option>Recreation and Entertainment</option>
                <option>Personal</option>
                <option>Others</option>
              </select>
              <label htmlFor="newCategory">Category</label>
            </div>
            <div className="col form-floating p-0 ms-2">
              <input
                value={newItem}
                placeholder={"Add item"}
                onChange={(event) => setNewItem(event.target.value)}
                className="form-control"
                id="newitem">
              </input>
              <label htmlFor="newItem" className="form-label"> Item</label>
            </div>

            <div className="col form-floating p-0 ms-2">

              <input
                value={newAmount}
                placeholder="Add amount"
                onChange={(event) => setNewAmount(event.target.value)}
                className="form-control"
                id="newAmount">

              </input>
              <label htmlFor="newAmount" className="form-label"> Amount</label>
            </div>
          </div>
          <div className="row w-25">
            <button id="buttons" className="btn" disabled={newCategory !== "" && newItem !== "" && newAmount !== "" ? false : true} onClick={editExpenseHandler}>Edit</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditExpense