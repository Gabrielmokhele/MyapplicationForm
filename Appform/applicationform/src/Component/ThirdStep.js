import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import { multiStepContext } from "../StepContext";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button, Typography, Grid, Box, Container, Stack } from "@mui/material";
import withAuth from "../hooks/useAuth";
import axios from "axios";
import Header from "./Header/header";

const FORM_VALIDATION = Yup.object().shape({
  file: Yup.mixed()
    .required("File is required")
    .test(
      "fileSize",
      "File size too large",
      (value) => value && value.size <= 1048576 // 1MB
    )
    .test(
      "fileType",
      "Invalid file format, only PDF allowed",
      (value) => value && value.type === "application/pdf"
    ),
});

const ThirdStep = () => {
  const { setStep, userData, setUserData, submitData } = useContext(multiStepContext);
  console.log("ThirdStep", userData);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    const myfile = event.target.files[0];
    setFileName(myfile);
    setUserData({ ...userData, file: myfile });
  };

  const downloadFile = () => {
    if (!userData.file) {
      console.error("No file uploaded");
      return;
    }

    const file = userData.file;
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const queryClient = useQueryClient();

  const createMyfileData = useMutation({
    mutationFn: (formData) => {
      
      const token = localStorage.getItem('token'); 
  
      return axios.post("http://localhost:5001/myfiles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`, 
        },
      });
    },
    onSuccess: (data) => {
      console.log("File data saved successfully", data);
      setUserData((prevData) => ({
        ...prevData,
        ThirdStepData: data.data.file,
      }));
      queryClient.invalidateQueries(["myfile"]);
    },
    onError: (error) => {
      console.error(
        "Error saving file data:",
        error.response ? error.response.data : error.message
      );
    },
  });

  const handleSubmit = () => {
    console.log("Submitting form data");
  
    const formData = new FormData();
    if (fileName) {
      formData.append("file", fileName);
    }
  
    createMyfileData.mutate(formData);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{ display: 'flex' }}>
        <Header />
        <Box
          component="main"
          sx={{
            mt: 2,
            flexGrow: 1,
            p: 3,
            transition: 'margin 0.3s ease',
          }}
        >
          <Container maxWidth="xl">
            <Stack sx={{ mt: 4 }}></Stack>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Upload Documents</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Paper>
                    <Typography variant="h5">Upload CV</Typography>
                  </Paper>
                </Grid>

                <Grid style={{ display: "flex" }} item xs={12}>
                  <input
                    accept=".pdf"
                    style={{ display: "none" }}
                    id="file-upload-button"
                    multiple={false}
                    type="file"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload-button">
                    <Button
                      style={{ marginTop: "5px" }}
                      variant="contained"
                      component="span"
                    >
                      Choose PDF File
                    </Button>
                  </label>
                  {fileName && (
                    <Link onClick={downloadFile} to="/">
                      <h2 style={{ marginTop: "5px", marginLeft: "5px" }}>
                        {fileName.name}
                      </h2>
                    </Link>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    style={{ marginRight: "5px" }}
                    variant="contained"
                    onClick={() => setStep(2)}
                    color="secondary"
                  >
                    Back
                  </Button>
                  <Button
                    style={{ marginRight: "5px" }}
                    type="button"
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                  <span></span>
                  <Button
                    type="button"
                    variant="contained"
                    color="success"
                    onClick={submitData}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </QueryClientProvider>
  );
};

export default withAuth(ThirdStep);

