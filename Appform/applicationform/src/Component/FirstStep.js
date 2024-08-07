import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Typography, Grid } from "@mui/material";
import { multiStepContext } from "../StepContext";
import { Formik, Form } from "formik";
import TextfieldWrapper from "./FormUI/TextfieldWrapper";
import DateTimePicker from "./FormUI/DateTimePicker";
import * as Yup from "yup";
import Select from "./FormUI/Select";
import axios from "axios";

const FirstStep = () => {
  const { setStep, userData, setUserData } = useContext(multiStepContext);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const url = "https://api.countrystatecity.in/v1/countries";
    const API_KEY = "bGNUQ3lHalZQZ1B0MkhoMll5M0d3ZHlRYTN5b2JFSWxhMnoyc0htUQ==";

    const fetchCountries = async () => {
      try {
        var config = {
          headers: {
            "X-CSCAPI-KEY": API_KEY,
          },
        };
        const { data } = await axios.get(url, config);

        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();
  }, []);

  const queryClient = useQueryClient();
  const createUserData = useMutation({
    mutationFn: (values) => axios.post("http://localhost:5001/persons", values),
    onSuccess: (data) => {
      console.log("User data saved successfully");
      setUserData((prevData) => ({
        ...prevData,
        ...data.data,
      }));
      queryClient.invalidateQueries(["person"]);
    },
    onError: (error) => {
      console.error("Error saving user data:", error);
    },
  });

  const handleSubmit = (values) => {
    createUserData.mutate(values);
  };

  return (
    <Formik
      initialValues={{
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        dateOfBirth: userData.dateOfBirth || "",
        email: userData.email || "",
        phone: userData.phone || "",
        addressLine1: userData.addressLine1 || "",
        addressLine2: userData.addressLine2 || "",
        city: userData.city || "",
        province: userData.province || "",
        country: userData.country || "",
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required("required"),
        lastName: Yup.string().required("required"),
        dateOfBirth: Yup.date().required("required"),
        email: Yup.string().email("Invalid email").required("required"),
        phone: Yup.number()
          .integer()
          .typeError("Enter a valid phone number")
          .required("required"),
        addressLine1: Yup.string().required("required"),
        addressLine2: Yup.string(),
        city: Yup.string().required("required"),
        province: Yup.string().required("required"),
        country: Yup.string().required("required"),
      })}
      onSubmit={handleSubmit}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Personal Details</Typography>
          </Grid>

          <Grid item xs={6}>
            <TextfieldWrapper
              name="firstName"
              label="First Name"
              color="secondary"
            />
          </Grid>
          <Grid item xs={6}>
            <TextfieldWrapper
              name="lastName"
              label="Last Name"
              variant="filled"
              color="secondary"
            />
          </Grid>
          <Grid item xs={6}>
            <DateTimePicker
              name="dateOfBirth"
              label="Date of Birth"
              variant="filled"
              color="secondary"
            />
          </Grid>

          <Grid item xs={6}>
            <TextfieldWrapper
              name="email"
              label="Email Address"
              variant="filled"
              color="secondary"
            />
          </Grid>
          <Grid item xs={6}>
            <TextfieldWrapper
              name="phone"
              label="Phone number"
              variant="filled"
              color="secondary"
            />
          </Grid>
          <Grid item xs={12}>
            <TextfieldWrapper
              name="addressLine1"
              label="Address Line 1"
              variant="filled"
              color="secondary"
            />
          </Grid>
          <Grid item xs={12}>
            <TextfieldWrapper
              name="addressLine2"
              label="Address Line 2"
              variant="filled"
              color="secondary"
            />
          </Grid>
          <Grid item xs={6}>
            <TextfieldWrapper
              name="city"
              label="City"
              variant="filled"
              color="secondary"
            />
          </Grid>
          <Grid item xs={6}>
            <TextfieldWrapper
              name="province"
              label="Province"
              variant="filled"
              color="secondary"
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              name="country"
              label="Country"
              options={countries?.map((country) => {
                return { label: country.name, value: country.name };
              })}
            />
          </Grid>

          <Grid item xs={1} style={{ display: "flex" }}>
            <Button type="submit" variant="contained" color="primary">
              SAVE
            </Button>

            <Button
              sx={{ ml: 2 }}
              fullWidth
              variant="contained"
              onClick={() => setStep(2)}
              color="success"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default FirstStep;
