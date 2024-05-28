import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Function to generate registration number in DDMMYYmmss format
  const generateRegistrationNumber = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${day}${month}${year}${minutes}${seconds}`;
  };

  const handleFormSubmit = async (values, actions) => {
    values.registrationNumber = generateRegistrationNumber(); // Regenerate registration number
    try {
      const response = await axios.post('http://localhost:8000/students', values);
      console.log(response.data);
      // Show a success message or handle the response as needed
      actions.resetForm({
        values: { ...initialValues, registrationNumber: generateRegistrationNumber() } // Reset the form with new registration number
      });
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      // Handle the error as needed
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        initialValues={{ ...initialValues, registrationNumber: generateRegistrationNumber() }}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? "span 2" : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Registration Number"
                value={values.registrationNumber}
                name="registrationNumber"
                error={!!touched.registrationNumber && !!errors.registrationNumber}
                helperText={touched.registrationNumber && errors.registrationNumber}
                sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
                // InputProps={{
                //   readOnly: true,
                // }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNo}
                name="phoneNo"
                error={!!touched.phoneNo && !!errors.phoneNo}
                helperText={touched.phoneNo && errors.phoneNo}
                sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Preparation Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.preparationType}
                name="preparationType"
                error={!!touched.preparationType && !!errors.preparationType}
                helperText={touched.preparationType && errors.preparationType}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Fee"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fee}
                name="fee"
                error={!!touched.fee && !!errors.fee}
                helperText={touched.fee && errors.fee}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.time}
                name="time"
                error={!!touched.time && !!errors.time}
                helperText={touched.time && errors.time}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                error={!!touched.status && !!errors.status}
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={values.status}
                  onBlur={handleBlur}
                  onChange={(event) => setFieldValue("status", event.target.value)}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Not Active">Not Active</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  registrationNumber: yup.string().required("required"),
  name: yup.string().required("required"),
  age: yup.number().required("required").positive().integer(),
  phoneNo: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  email: yup.string().email("invalid email").required("required"),
  address: yup.string().required("required"),
  preparationType: yup.string().required("required"),
  fee: yup.number().required("required").positive(),
  time: yup.string().required("required"),
  status: yup.string().required("required"),
});

const initialValues = {
  registrationNumber: "",
  name: "",
  age: "",
  phoneNo: "",
  email: "",
  address: "",
  preparationType: "",
  fee: "",
  time: "",
  status: "",
};

export default Form;
