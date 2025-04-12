import { useState } from "react";

function AddExpense(props) {

  	const { expenseList, setExpensesList, setBudget, setData, data} = props;

  	const [category, setCategory] = useState('');
  	const [item, setItem] = useState('');
	const [amount, setAmount] = useState('');
	const [count, setCount] = useState(expenseList.length)
  	const [legendId, setLegendId] = useState(0)
	//const [error, setError] = useState(false)

	const [categoryError, setCategoryError] = useState('');
  	const [itemError, setItemError] = useState('');
	const [amountError, setAmountError] = useState('');

	function checkInput(){
		let error = false
		if(!category){
			setCategoryError("Select category")
			error = true
		}
		if(!item){
			console.log("item")
			setItemError("Input item")
			error = true
		}
		if(!amount){
			setAmountError("Input amount")
			error = true
		}else if(amount <= 0){
			setAmountError("Input amount greater than 0")
			error = true
		}

		return error
	}

  	function addExpenseHandler(event){
		event.preventDefault();
   
		let  newAmount = Number(amount)

		const validation = checkInput()
console.log(itemError)
		//if(category && item && amcount && newAmount > 0){
		if(!validation){
			setCount(count + 1)
			const newExpense = {
				id: count,
				category: category,
				item: item,
				amount: newAmount
			}
						
			const checkLegend = data.filter(item => item.label === newExpense.category)
				
			if (!checkLegend.length){
				setData(
					[...data,
						{
							id: legendId,
							value: newExpense.amount,
							label: newExpense.category
						}
					])
			}else{
				const updateLegend = data.map((cat) => {
					if(cat.label === newExpense.category){
						return {...cat, value: cat.value + newAmount}
					}else{
						return cat
					}
				})
					
				setData(updateLegend)
			}
				
			setLegendId(legendId + 1)
						
			setExpensesList((prevExpenses) => [...prevExpenses, newExpense])
			setBudget((prev) => prev - amount)
			setCategory('')
			setItem('')
			setAmount('')
		} 
	}

   return (
      <div className="w-75 mx-auto">
			<h4>Input Expense</h4>
			
				<div className={`row form-floating ${categoryError ? "" : "mb-4"}`}>
					<select 
						className={`form-select ${categoryError ? "is-invalid" : ""}`}
						id="category" 
						value={category} 
						onChange={(event) => {
							setCategory(event.target.value)
							setCategoryError('')
						} 
					}>
						<option style={{ display: 'none' }}> Choose Category </option>
						<option>Food and Beverage</option>
						<option>Transportation</option>
						<option>Bills and Utilities</option>
						<option>Medical and Healthcare</option>
						<option>Recreation and Entertainment</option>
						<option>Personal</option>
						<option>Others</option>
					</select>
					<label htmlFor="category">Category</label>
					{categoryError && <div className="invalid-feedback">{categoryError}</div>}
				</div>
				
				<div className={`row form-floating mt-1 ${itemError ? "" : "mb-4"}`}>
					<input 
						value={item} 
						placeholder="Add item" 
						onChange={(event) => {
							setItem(event.target.value) 
							setItemError('')}
						}
						className={`form-control ${itemError ? "is-invalid" : ""}`}
						id="item" required>
					</input>
					<label htmlFor="item">Item</label>
					{itemError && <div className="invalid-feedback position-relative">{itemError}</div>}
				</div>

				<div className={`row form-floating mt-1 ${amountError ? "" : "mb-4"}`}>
					<input 
						value={amount} 
						placeholder="Add amount" 
						onChange={(event) => {
							setAmount(event.target.value)
							setAmountError('')}
						}
						className={`form-control ${amountError ? "is-invalid" : ""}`}
						id="item"
						type="number">
					</input>
					<label htmlFor="amount">Amount</label>
					<div className="invalid-feedback">{amountError}</div>
				</div>
			
			<div className="row mx-auto w-25 mt-2">
            	<button className="btn btn-outline-secondary" onClick={addExpenseHandler}>Add</button>
				</div>
      </div>
   );
}

export default AddExpense;