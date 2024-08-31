import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field, ErrorMessage} from "formik";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Fab from "@mui/material/Fab";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const defaultValues = {
    name: "",
    email: "",
    gender: "",
    phonenumber: "",
    password: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    checkbox: false,
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("Enter name").min(2),
    email: yup.string().required("Enter email").email("Valid email required"),
    gender: yup.string().required("Select gender"),
    phonenumber: yup.string().required("Enter phone number").min(8).max(10),
    password: yup
      .string()
      .required("Enter password")
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password cannot be more than 15 characters")
      .matches(/[A-Z]/, "Include an uppercase letter")
      .matches(/[a-z]/, "Include a lowercase letter")
      .matches(/[0-9]/, "Include a number")
      .matches(
        /[@!#$%^&*()_+{}\[\]:;"'<>,.?~`]/,
        "Include a special character"
      ),
    address: yup.string().required("Enter Address"),
    country: yup.string().required("Select Country"),
    state: yup.string().required("Selectr State"),
    city: yup.string().required("Select City"),
    pincode: yup
      .string()
      .required("Enter pincode Number")
      .matches(/^\d+$/, "Pincode must be a number")
      .max(10),
    checkbox: yup.boolean().oneOf([true], "Please accept terms and conditions"),
  });


  useEffect(() => {
    axios
      .get("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY":
            "b3JlTnNMWHhJSUJuMFVMNzIyTGFCa1VjYWVQaHl1NXJzRVZhcFEyMg==",
        },
      })
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`,
          {
            headers: {
              "X-CSCAPI-KEY":
                "b3JlTnNMWHhJSUJuMFVMNzIyTGFCa1VjYWVQaHl1NXJzRVZhcFEyMg==",
            },
          }
        )
        .then((response) => {
          setStates(response.data);
        })
        .catch((error) => console.error("Error fetching states:", error));
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      axios
        .get(
          `https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${selectedState}/cities`,
          {
            headers: {
              "X-CSCAPI-KEY":
                "b3JlTnNMWHhJSUJuMFVMNzIyTGFCa1VjYWVQaHl1NXJzRVZhcFEyMg==",
            },
          }
        )
        .then((response) => {
          setCities(response.data);
        })
        .catch((error) => console.error("Error fetching cities:", error));
    } else {
      setCities([]);
    }
  }, [selectedState, selectedCountry]);

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    alert("Successfully  Submit");
  };

  return (
    <>
      <Box className="head">
        <Paper elevation={20}>
          <h1>Registration Form</h1>

          <Formik
            initialValues={defaultValues}
            onSubmit={handleSubmit}
            validationSchema={formSchema}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="form-head">
                  <div className="NE">
                    <Field
                      as={TextField}
                      name="name"
                      label="Name"
                      variant="standard"
                      className="Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      style={{ color: "red" }}
                    />

                    <div className="div-email">
                      <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        variant="standard"
                        className="Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>

                  <div className="GP">
                    <FormControl variant="standard" className="gender">
                      <InputLabel> Gender</InputLabel>
                      <Field name="gender" as={Select}>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </FormControl>

                    <div className="div-phone">
                      <Field
                        as={TextField}
                        name="phonenumber"
                        label="Phone Number"
                        variant="standard"
                        className="Phone-num"
                      />
                      <ErrorMessage
                        name="phonenumber"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>

                  <div className="PA">
                    <Field
                      as={TextField}
                      name="password"
                      label="Password"
                      variant="standard"
                      className="Pass"
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      style={{ color: "red" }}
                    />

                    <div className="div-Address">
                      <Field
                        as={TextField}
                        name="address"
                        label="Address"
                        variant="standard"
                        className="Add"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>

                  <div className="CS">
                    <div className="div-country">
                      <Autocomplete
                        options={countries}
                        getOptionLabel={(option) => option.name}
                        value={
                          countries.find(
                            (country) => country.iso2 === selectedCountry
                          ) || null
                        }
                        onChange={(event, newValue) => {
                          setSelectedCountry(newValue ? newValue.iso2 : "");
                          setFieldValue(
                            "country",
                            newValue ? newValue.name : ""
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Country"
                            variant="standard"
                          />
                        )}
                        sx={{ width: 300, marginBottom: 2 }}
                      />
                      <ErrorMessage
                        name="country"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>

                    <div className="div-state">
                      <Autocomplete
                        options={states}
                        getOptionLabel={(option) => option.name}
                        value={
                          states.find(
                            (state) => state.iso2 === selectedState
                          ) || null
                        }
                        onChange={(event, newValue) => {
                          setSelectedState(newValue ? newValue.iso2 : "");
                          setFieldValue("state", newValue ? newValue.name : "");
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="State"
                            variant="standard"
                          />
                        )}
                        sx={{ width: 300, marginBottom: 2 }}
                      />
                      <ErrorMessage
                        name="state"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>

                  <div className="PC">
                    <Autocomplete
                      options={cities}
                      getOptionLabel={(option) => option.name}
                      value={
                        cities.find((city) => city.iso2 === selectedCity) ||
                        null
                      }
                      onChange={(event, newValue) => {
                        setSelectedCity(newValue ? newValue.iso2 : "");
                        setFieldValue("city", newValue ? newValue.name : "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="City"
                          variant="standard"
                        />
                      )}
                      sx={{ width: 300 }}
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      style={{ color: "red" }}
                    />

                    <div className="div-pin">
                      <Field
                        as={TextField}
                        name="pincode"
                        label="Pincode"
                        variant="standard"
                        className="Pin-country"
                      />
                      <ErrorMessage
                        name="pincode"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>

                  <div className="checkbox">
                    <Field type="checkbox" name="checkbox" className="check" />
                    <label htmlFor="">I accept terms and conditions?</label>
                    <ErrorMessage
                      name="checkbox"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div className="div-btn">
                    <Fab
                      variant="extended"
                      color="primary"
                      size="medium"
                      sx={{ width: 150 }}
                      className="btn"
                      type="submit"
                    >
                      Submit
                    </Fab>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </>
  );
}

export default Register;
