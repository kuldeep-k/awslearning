import React, { useState, useEffect } from "react";
import axios from 'axios';
import UserForm from "./UserForm";
import { useParams, useNavigate } from 'react-router-dom';

import { useSnackbar } from 'material-ui-snackbar-provider';

// CreateUser Component
const CreateUser = () => {
  const [formValues, setFormValues] =
    useState({ id: '', name: '', age: '', dob: '' })

  const snackbar = useSnackbar()
  const history = useNavigate();
  // onSubmit handler
  const onSubmit = userObject => {
    axios.post(
      process.env.REACT_APP_BACKEND_API + '/users',
      userObject)
      .then(res => {
        if (res.status === 200) {
          // alert('User successfully created')
          snackbar.showMessage('User successfully added.');
          // props.history.push("/user-list");
          history("/user-list");
        }

        if (res.status === 422) {
          console.log(res.data)
          alert('User created failure')
        }

        else {
          console.log("res.data 1")
          console.log(res.data)
          Promise.reject()
        }

      })
      .catch(err => {
        console.log("err 1")
        if (err.response.status === 422) {
          alert(err.response.data.error)
        } else {
          alert("Something gone wrong");
        }
        // console.log(err.response.data.error)

      })
  }

  // Return student form
  return (
    <UserForm initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize>
      Create User
    </UserForm>
  )
}

export default CreateUser;