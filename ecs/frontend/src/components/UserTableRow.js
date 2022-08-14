import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

import { useSnackbar } from 'material-ui-snackbar-provider';

const UserTableRow = (props) => {
	const { id, name, age, dob } = props.obj;
	const snackbar = useSnackbar()
	const history = useNavigate();

	const deleteUser = () => {
		axios
			.delete(
				process.env.REACT_APP_BACKEND_API + "/users/" + id)
			.then((res) => {
				if (res.status === 200) {
					alert("User successfully deleted");
					// window.location.reload();
					snackbar.showMessage('User successfully deleted.');
					// props.history.push("/user-list");
					history("/user-list");
				} else Promise.reject();
			})
			.catch((err) => alert("Something went wrong"));
	};

	return (
		<tr>
			<td>{id}</td>
			<td>{name}</td>
			<td>{age}</td>
			<td>{dob}</td>
			<td>
				<Link className="edit-link"
					to={"/edit-user/" + id}>
					Edit
				</Link>
				<Button onClick={deleteUser}
					size="sm" variant="danger">
					Delete
				</Button>
			</td>
		</tr>
	);
};

export default UserTableRow;
