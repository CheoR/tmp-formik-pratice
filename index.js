import React from "react";
// import ReactDOM from "react-dom";

import { Formik, Form, useField } from 'formik';
// import { useFormik } from "formik";

import * as Yup from 'yup';

import "./styles.css";

const fieldsSchema = Yup.object({

  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .min(2, 'Must be 2 characters or more')
    .required('Required'),

  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .min(2, 'Must be 2 characters or more')
    .required('Required'),

  email: Yup.string()
    .email('Invalid email address: email@address.com')
    .required('Required'),

  acceptedTerms: Yup.boolean()
    .required('Required')
    .oneOf([true], 'You must accept the terms and conditions.'),

  loanType: Yup.string()
    .oneOf(
      ['builder', 'owner', 'renovation', 'other'],
      'Invalid Loan Type'
    )
    .required('Required'),
});


const FormTextInput = ({ label, ...props }) => {
  /*
    useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    spread on <input>. Use field meta to show an err  
    message if the field is invalid and it has been touched (i.e. visited)
  */
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {
        meta.touched && meta.error ? (
          <div className="error">
            {meta.error}
          </div>
        ) : null
      }
    </>
  );
};

const FormCheckbox = ({ children, ...props }) => {
  /*
  React treats radios and checkbox inputs differently other input types, select, and textarea
  Formik does this too! When you specify `type` to useField(), it returns
  the correct bag of props for you -- a `checked` prop will be included
  in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  */
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {
        meta.touched && meta.error ? (
          <div className="error">
            {meta.error}
          </div>
        ) : null
      }
    </div>
  );
};

const FormSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {
        meta.touched && meta.error ? (
          <div className="error">
            {meta.error}
          </div>
        ) : null
      }
    </div>
  );

};


export default function LoanForm(props) {
// const LoanForm = (props) => {
  return (
    <section className="container">
      <h1>Loan Application</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          acceptedTerms: false, // for checkbox
          loanType: '', // for select

        }}

        validationSchema={fieldsSchema}

        // onSubmit={(values, { setSubmitting }) => {
        //   setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //   }, 400);
        // }}
        onSubmit={(values, { setSubmitting }) => {
          const { redirectToOnSuccess, url } = props
          console.log(values)
          setSubmitting(false);
          redirectToOnSuccess.push(url)
        }}
      >

        <Form className="form">
          <FormTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Bob"
          />

          <FormTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Builder"
          />

          <FormTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="bob@builder.com"
          />

          <FormSelect label="Loan Type" name="loanType">
            <option value="">Select a loan type</option>
            <option value="builder">Builder</option>
            <option value="owner">Owner</option>
            <option value="renovation">Renovation</option>
            <option value="other">Other</option>
          </FormSelect>

          <FormCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </FormCheckbox>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </section>
  );
};

// const validate = values => {
//   const errors = {};
//   if (!values.firstName) {
//     errors.firstName = 'Required';
//   } else if (values.firstName.length > 15) {
//     errors.firstName = 'Must be 15 characters or less';
//   } else if (values.firstName.length < 2) {
//     errors.firstName = 'Must be 2 characters or more';
//   }

//   if (!values.lastName) {
//     errors.lastName = 'Required';
//   } else if (values.lastName.length > 20) {
//     errors.lastName = 'Must be 20 characters or less';
//   } else if (values.lastName.length < 2) {
//     errors.lastName = 'Must be 2 characters or more';
//   }

//   if (!values.email) {
//     errors.email = 'Required';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address: email@address.com';
//   }
//   return errors;
// };


// const LoanForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       email: ""
//     },
//     validationSchema: fieldsSchema,
//     onSubmit: values => {
//       alert(JSON.stringify(values, null, 2));
//     }
//   });
//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <label htmlFor="firstName">First Name</label>
//       <input
//         id="firstName"
//         name="firstName"
//         type="text"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.firstName}
//       />
//       {formik.touched.firstName && formik.errors.firstName ? (
//         <div>{formik.errors.firstName}</div>
//       ) : null}

//       <label htmlFor="lastName">Last Name</label>
//       <input
//         id="lastName"
//         name="lastName"
//         type="text"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.lastName}
//       />
//       {formik.touched.lastName && formik.errors.lastName ? (
//         <div>{formik.errors.lastName}</div>
//       ) : null}

//       <label htmlFor="email">Email Address</label>
//       <input
//         id="email"
//         name="email"
//         type="email"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.email}
//       />
//       {formik.touched.email && formik.errors.email ? (
//         <div>{formik.errors.email}</div>
//       ) : null}

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// function App() {
//   return <LoanForm />;
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
