import { useState } from "react";

function EditExpense(props){

    const{expenseToEdit, expenseList, setExpensesList, setShowEditExpense, setBudget, setData, data} = props
    const {id, category, item, amount} = expenseToEdit
    const [newCategory, setNewCategory] = useState(category);
    const [newItem, setNewItem] = useState(item);
    const [newAmount, setNewAmount] = useState(amount);

   function editExpenseHandler(event){
      event.preventDefault()

      if(newCategory && newItem && newAmount && Number(newAmount) > 0){
			const editedExpense = {
				id: id,
				category: newCategory,
				item: newItem,
				amount: Number(newAmount)
			}

         const editedExpenseList = expenseList.map((expense)=>{
            if(expense.id === id){
               console.log("in")
               return editedExpense
            }else{
               return expense
            }
         })

         const updateLegend = data.map((cat) => {
            if(cat.label === editedExpense.category){
               return {...cat, value: cat.value + (newAmount - amount)}
            }else{
               return cat
            }
         })

         setData(updateLegend)
         setExpensesList(editedExpenseList)
         setBudget((prev) => prev + (amount-newAmount))
      }
      
      setNewCategory('')
		setNewItem('')
      setNewAmount('')
      setShowEditExpense(false)   
}

   return(
      <div>
         <form onSubmit={editExpenseHandler}>
		   	<select value={newCategory} onChange={(event) => setNewCategory(event.target.value)} >
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
               value={newItem} 
               placeholder={"Add item" }
               onChange={(event) => setNewItem(event.target.value)}>
            </input>
            
            <input 
               value={newAmount} 
               placeholder="Add amount" 
               onChange={(event) => setNewAmount(event.target.value)}>
            </input>
            
            <button>Edit Expense</button>
      	</form>
      </div>
    )
}

export default EditExpense