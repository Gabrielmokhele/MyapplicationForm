import React, { useContext } from "react";
import { Button, Typography, Grid } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { multiStepContext } from "../StepContext";
import { Formik, Form, FieldArray } from "formik";
import TextfieldWrapper from "./FormUI/TextfieldWrapper";
import DateTimePicker from "./FormUI/DateTimePicker";
import * as Yup from "yup";
import axios from "axios";

const SecondStep = () => {
  const { setStep, userData, setUserData } = useContext(multiStepContext);

  const queryClient = useQueryClient();
  const createEducationsAndExpriences = useMutation({
    mutationFn: (values) =>
      axios.post("http://localhost:5001/educationsandexperiences", values),
    onSuccess: (data) => {
      console.log("educations and experiences data saved successfully");
      setUserData((prevData) => ({
        ...prevData,
        ...data.data,
      }));
      queryClient.invalidateQueries(["experiences"], ["educations"]);
    },
    onError: (error) => {
      console.error("Error saving educations and experiences data:", error);
    },
  });

  const handleSubmit = (values) => {
    createEducationsAndExpriences.mutate(values);
  };

  const INITIAL_FORM_STATE = {
    experiences: [
      {
        employer: userData.employer || "",
        position: userData.position || "",
        startDate: userData.startDate || "",
        endDate: userData.endDate || "",
        roleDescription: userData.roleDescription || "",
      },
    ],
    educations: [
      {
        institution: userData.institution || "",
        qualification: userData.qualification || "",
        startDate1: userData.startDate1 || "",
        endDate1: userData.endDate1 || "",
        description: userData.description || "",
      },
    ],
  };

  return (
    <Formik
      initialValues={{
        experiences: userData.experiences || [
          ...INITIAL_FORM_STATE.experiences,
        ],
        educations: userData.educations || [...INITIAL_FORM_STATE.educations],
      }}
      validationSchema={Yup.object().shape({
        experiences: Yup.array().of(
          Yup.object().shape({
            employer: Yup.string().required("required"),
            position: Yup.string(),
            startDate: Yup.date(),
            endDate: Yup.date(),
            roleDescription: Yup.string(),
          })
        ),
        educations: Yup.array().of(
          Yup.object().shape({
            institution: Yup.string().required("required"),
            qualification: Yup.string(),
            startDate1: Yup.date(),
            endDate1: Yup.date(),
            description: Yup.string(),
          })
        ),
      })}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="experiences">
            {({ push, remove }) => (
              <div>
                {values.experiences.map((exp, index) => (
                  <div key={index}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>Experience {index + 1}</Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <TextfieldWrapper
                          name={`experiences.${index}.employer`}
                          label="Employer"
                          value={values.experiences[index].employer}
                          variant="filled"
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextfieldWrapper
                          name={`experiences.${index}.position`}
                          label="Position"
                          value={values.experiences[index].position}
                          variant="filled"
                          color="secondary"
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <DateTimePicker
                          name={`experiences.${index}.startDate`}
                          label="Start Date"
                          value={values.experiences[index].startDate}
                          variant="filled"
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker
                          name={`experiences.${index}.endDate`}
                          label="End Date"
                          value={values.experiences[index].endDate}
                          variant="filled"
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextfieldWrapper
                          name={`experiences.${index}.roleDescription`}
                          label="Role Description"
                          value={values.experiences[index].roleDescription}
                          multiline={true}
                          rows={9}
                          variant="filled"
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                        <Button
                          style={{ marginLeft: "5px" }}
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            push({
                              employer: "",
                              position: "",
                              startDate: "",
                              endDate: "",
                              roleDescription: "",
                            })
                          }
                        >
                          Add
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </div>
            )}
          </FieldArray>
          <br></br>
          <FieldArray name="educations">
            {({ push, remove }) => (
              <div>
                {values.educations.map((exp, index) => (
                  <div key={index}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <br></br>
                        <Typography>Education {index + 1}</Typography>
                      </Grid>
                      <br></br>

                      <Grid item xs={12}>
                        <TextfieldWrapper
                          name={`educations.${index}.institution`}
                          label="Institution"
                          value={values.educations[index].institution}
                          variant="filled"
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextfieldWrapper
                          name={`educations.${index}.qualification`}
                          label="Qualification"
                          value={values.educations[index].qualification}
                          variant="filled"
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker
                          name={`educations.${index}.startDate1`}
                          label="Start Date"
                          value={values.educations[index].startDate1}
                          variant="filled"
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker
                          name={`educations.${index}.endDate1`}
                          label="End Date"
                          value={values.educations[index].endDate1}
                          variant="filled"
                          color="secondary"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextfieldWrapper
                          name={`educations.${index}.description`}
                          label="Description"
                          value={values.educations[index].description}
                          multiline={true}
                          rows={9}
                          variant="filled"
                          color="secondary"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                        <Button
                          style={{ marginLeft: "5px" }}
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            push({
                              institution: "",
                              qualification: "",
                              startDate1: "",
                              endDate1: "",
                              description: "",
                            })
                          }
                        >
                          Add
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </div>
            )}
          </FieldArray>
          <br></br>
          <Button type="submit" variant="contained" color="primary">
            SAVE
          </Button>

          <Button
            sx={{ ml: 2 }}
            variant="contained"
            onClick={() => setStep(1)}
            color="secondary"
          >
            Back
          </Button>
          <Button
            sx={{ ml: 2 }}
            variant="contained"
            onClick={() => setStep(3)}
            color="success"
          >
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SecondStep;
