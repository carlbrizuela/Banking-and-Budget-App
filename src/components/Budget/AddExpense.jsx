import { useState } from "react";

function AddExpense(props) {

    const { expenseList, setExpensesList, setBudget } = props;
    const [category, setCategory] = useState('');
    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');
	 const [count, setCount] = useState(expenseList.length)

    function addExpenseHandler(event){
		event.preventDefault();
		if(category && item && amount && Number(amount) > 0){
		setCount(count + 1)
		const newExpense =
			{
				id: count,
				category: category,
				item: item,
				amount: amount
			}

		setExpensesList((prevExpenses) => [...prevExpenses, newExpense])
		setBudget((prev) => prev - amount)
		setCategory('')
		setItem('')
		setAmount('')
		}else{
            alert("{Please input valid values")
        }
    }

    return (
        <div className="expense">
            <form onSubmit={addExpenseHandler}>
					<select value={category} onChange={(event) => setCategory(event.target.value)} >
						<option selected style={{ display: 'none' }}> Choose Category </option>
						<option>Food & Beverage</option>
						<option>Transportation</option>
						<option>Utilities</option>
						<option>Medical</option>
						<option>Personal</option>
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