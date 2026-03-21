import { useState } from "react";

function EditBudget(props) {

	const { setBudget, setShowEditBudget } = props
	const [newBudget, setNewBudget] = useState('')


	function handleEditBudget() {
		setBudget(Number(newBudget))
		setShowEditBudget(false)
		setNewBudget('')
	}

	return (
		<div>
			<div className="modal" style={{ display: "block" }} >
				<div className="modal-dialog modal-dialog-centered modal-md vh-10">
					<div className="modal-content w-100 pt-0 justify-content-evenly" id="editBudgetModal">
						<div className='modal-header d-flex flex-row justify-content-between w-100 ps-3 pt-0 pb-2'>
							<h3 className="mb-0">Edit Budget</h3>
							<span className="closeButton fs-2" onClick={() => setShowEditBudget(false)}>&times;</span>
						</div>

						<div className="row form-floating w-75 mx-auto">
							<input
								value={newBudget}
								placeholder={"Input new budget"}
								onChange={(event) => setNewBudget(event.target.value)}
								className="form-control"
								id="newitem">
							</input>
							<label htmlFor="newItem" className="form-label"> New Budget</label>

						</div>

						<div className="row w-100">
							<button id="buttons" className="btn w-50 mx-auto" disabled={newBudget !== "" && newBudget > 0 ? false : true} onClick={handleEditBudget}>Edit</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default EditBudget