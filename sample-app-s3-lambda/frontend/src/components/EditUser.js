// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import { useParams, useNavigate } from 'react-router-dom';

import { useSnackbar } from 'material-ui-snackbar-provider';

// EditStudent Component
const EditUser = (props) => {
	console.log("props 0 = ", props)
	// const [userId, setUserId] = useState(0); 
	// console.log("props 1 = ", props)

	const snackbar = useSnackbar()

	const [formValues, setFormValues] = useState({
		id: 0,
		name: "",
		age: 0,
		dob: "",
	});
	let { id } = useParams()
	const history = useNavigate();
	// setUserId(id);
	//onSubmit handler
	const onSubmit = (userObject) => {
		
		axios
		.patch(
			process.env.REACT_APP_BACKEND_API + "/users/" +
			id,
			userObject
		)
		.then((res) => {
			if (res.status === 200) {
			// alert("User successfully updated");
			snackbar.showMessage('User successfully updated.');
			// props.history.push("/user-list");
			history("/user-list");
			} else Promise.reject();
		})
		.catch((err) => alert("Something went wrong"));
	};

	// Load data from server and reinitialize student form
	useEffect(() => {
		// 	console.log("props 2 = ", userId)
			axios
			.get(
				process.env.REACT_APP_BACKEND_API + "/users/"
				// + props.match.params.id
				+ id
			)
			.then((res) => {
				const { id, name, age, dob } = res.data;
				setFormValues({ id, name, age, dob });
			})
			.catch((err) => console.log(err));
		
		
	}, [props]);

	// Return student form
	return (
		<UserForm
		initialValues={formValues}
		onSubmit={onSubmit}
		enableReinitialize
		>
		Update User
		</UserForm>
	);
};

// Export EditStudent Component
export default EditUser;
