import { useState } from "react";
import AddExpense from "./AddExpense";

function Dashboard() {
    
    const [budget, setBudget] = useState('');
    const [expenseList, setExpensesList] = useState([]);
    const [showBudget, setShowBudget] = useState(false)
   
    
     function handleDeleteExpense(expenseId){
        setExpensesList((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId))
        expenseList.forEach((expense) => {
            if(expense.id === expenseId){
                setBudget((prev) => prev + Number(expense.amount))
            }
            })
    }

    function handleEditExpense(expenseId){
        
    }

    function displayBudget(event){
        event.preventDefault();
        if(budget > 0 && budget){
            setShowBudget(true);
        }else{
            alert("Please input valid budget amount")
            setBudget('')
        }
    }


    return (
        <div className="App">
            <div>
                { !showBudget &&
                <form onSubmit={displayBudget}>
                    <input value = {budget} placeholder="Input Budget" onChange={(event) => setBudget(event.target.value)}></input>
                </form>
                }
                {
                    showBudget && <span><strong>Current Budget: </strong>{budget}</span>
                }
            </div>
        {
            expenseList.map((expense) => {
                return (
                    <div key={expense.id}> 
                        <span>{expense.category}</span>
                        <span>{expense.item}</span>
                        <span>{expense.amount}</span>
                        <button onClick={() => handleEditExpense(expense.id)}>Edit</button>
                        <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                    </div>
                );
                
            })
            
        }
            {showBudget && <AddExpense expenseList = {expenseList} setExpensesList={setExpensesList} setBudget = {setBudget} />}
        </div>
    );
}

export default Dashboard;