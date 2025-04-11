import { useState } from "react";

function AddExpense(props) {

  	const { expenseList, setExpensesList, setBudget, setData, data} = props;

  	const [category, setCategory] = useState('');
  	const [item, setItem] = useState('');
	const [amount, setAmount] = useState('');
	const [count, setCount] = useState(expenseList.length)
  	const [legendId, setLegendId] = useState(0)

  	function addExpenseHandler(event){
		event.preventDefault();
   
		let  newAmount = Number(amount)

		if(category && item && amount && newAmount > 0){
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
		}else{
      	alert("Please input valid values")
   	}     
	}

   return (
      <div className="expense">
         <form onSubmit={addExpenseHandler}>
				<select value={category} onChange={(event) => setCategory(event.target.value)} >
					<option style={{ display: 'none' }}> Choose Category </option>
					<option>Food and Beverage</option>
					<option>Transportation</option>
					<option>Bills and Utilities</option>
					<option>Medical and Healthcare</option>
               <option>Recreation and Entertainment</option>
					<option>Personal</option>
               <option>Others</option>
            </select>
                
            <input 
               value={item} 
               placeholder="Add item" 
               onChange={(event) => setItem(event.target.value)}>
            </input>
            <input 
               value={amount} 
               placeholder="Add amount" 
               onChange={(event) => setAmount(event.target.value)}>
            </input>
            <button>Add Expense</button>
      	</form>
      </div>
   );
}

export default AddExpense;