import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, Label, ErrorMessage } from "formik";
import { Row, Col, FormGroup, FormControl, Button } from "react-bootstrap";
  
const UserForm = (props) => {
  const validationSchema = Yup.object().shape({
    id: Yup.number().required("Required"),
    
    name: Yup.string().required("Required"),
    age: Yup.number()
      .positive("Invalid age")
      .integer("Invalid age")
      .required("Required"),
  });
  console.log(props);
  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
        <FormGroup>
            <Field name="id" type="number" placeholder="ID" 
                className="form-control" />
            <ErrorMessage
              name="id"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>

          <FormGroup>
            <Field name="name" type="text" placeholder="Name" 
                className="form-control" />
            <ErrorMessage
              name="name"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="age" type="number" placeholder="Age" 
                className="form-control" />
            <ErrorMessage
              name="age"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <Field name="dob" type="text" placeholder="DoB"
                className="form-control" />
            <ErrorMessage
              name="dob"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <Button variant="danger" size="lg" 
            block="block" type="submit">
            {props.children}
          </Button> 
          </Form>
        </Formik> 

{ /*
<Formik {...props} validationSchema={validationSchema}>

{({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (

<Form noValidate>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              controlId="validationFormik101"
              className="position-relative"
            >
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={values.id}
                onChange={handleChange}
                isValid={touched.id && !errors.id}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>
            </Row>

            <Row className="mb-3">
            <Form.Group
              as={Col}
              controlId="validationFormik101"
              className="position-relative"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isValid={touched.name && !errors.name}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>
            </Row>

            <Row className="mb-3">
            <Form.Group
              as={Col}
              controlId="validationFormik101"
              className="position-relative"
            >
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                name="age"
                value={values.ageid}
                onChange={handleChange}
                isValid={touched.age && !errors.age}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>
            </Row>

            <Row className="mb-3">
            <Form.Group
              as={Col}
              controlId="validationFormik101"
              className="position-relative"
            >
              <Form.Label>DoB</Form.Label>
              <Form.Control
                type="text"
                name="dob"
                value={values.dob}
                onChange={handleChange}
                isValid={touched.dob && !errors.dob}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>
            </Row>

            <Button variant="primary" size="lg" 
            block="block" type="submit">
            {props.children}
          </Button>

            </Form>
      )}
      </Formik>
      */ }
    </div>
  );
};
  
export default UserForm;