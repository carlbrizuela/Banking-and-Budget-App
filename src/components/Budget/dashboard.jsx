import { useState } from "react";
import AddExpense from "./AddExpense";
import DisplayChart from "./DisplayChart";
import EditExpense from "./EditExpense";

function Dashboard() {
    
   const [budget, setBudget] = useState('');
   const [expenseList, setExpensesList] = useState([]);
   const [data, setData] = useState([])   
   const [expenseToEdit, setExpenseToEdit ] = useState({})
   const [showBudget, setShowBudget] = useState(false)
   const [showChart, setShowChart] = useState(false)
   const [showEditExpense, setShowEditExpense] = useState(false)
       
   function handleDeleteExpense(expenseId){
      setExpensesList((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId))

      expenseList.forEach((expense) => {
			if(expense.id === expenseId){
				setBudget((prev) => prev + Number(expense.amount))
            
            const checkLegend = expenseList.filter((prevList) => prevList.category === expense.category)
            
            if (checkLegend.length === 1){
               setData((prevData) => prevData.filter((legend) => legend.label !== expense.category))
            }else{
               const updateLegend = data.map((cat) => {
                  if(cat.label === expense.category){
                     return {...cat, value: cat.value - expense.amount}
                  }else{
                     return cat
                  }
               })
               setData(updateLegend)
            }
         }
      })
   }
  
   function handleEditExpense(expenseId){
      const  newExpense = expenseList.filter((expense) => expense.id === expenseId)
      setExpenseToEdit(newExpense[0])
      setShowEditExpense(true)
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
            { showBudget && <span><strong>Current Budget: </strong><span style={{color: budget < 0 ? "red" : "black"}}>{budget}</span></span> }
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

         { showBudget && <AddExpense expenseList = {expenseList} setExpensesList={setExpensesList} setBudget = {setBudget} setData={setData} data={data}/> }
         { showEditExpense && <EditExpense expenseToEdit={expenseToEdit} expenseList = {expenseList} setExpensesList={setExpensesList} setShowEditExpense={setShowEditExpense} setBudget={setBudget} setData={setData} data={data}/>}
         { expenseList.length !== 0 && showBudget && <button onClick={() => setShowChart(true)}>Display Chart</button>}
         { showChart && <DisplayChart data={data} />}
      </div>
   );
}

export default Dashboard;