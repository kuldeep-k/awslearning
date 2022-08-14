import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import UserTableRow from "./UserTableRow";

const UserList = () => {
const [users, setUsers] = useState([]);

useEffect(() => {
	console.log("111111111111111111111111	")
	axios
	.get(process.env.REACT_APP_BACKEND_API + "/users", {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	})
	.then(({ data }) => {
		setUsers(data);
	})
	.catch((error) => {
		console.log(error);
	});
	
}, []);

const DataTable = () => {
	return users.map((res, i) => {
	return <UserTableRow obj={res} key={i} />;
	});
};

return (
	<div className="table-wrapper">
	<Table striped bordered hover>
		<thead>
		<tr>
        <th>Id</th>
			<th>Name</th>
			<th>Age</th>
			<th>DoB</th>
			<th>Action</th>
		</tr>
		</thead>
		<tbody>{DataTable()}</tbody>
	</Table>
	</div>
);
};

export default UserList;
