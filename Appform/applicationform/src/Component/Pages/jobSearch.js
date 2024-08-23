import React, { useState } from 'react';
import { Typography, Grid, Card, CardContent, Button, Box, TextField, Avatar } from '@mui/material';
import Header from '../Header/header';
import JobPopup from '../jobPopUp';
import { useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import withAuth from '../../hooks/useAuth';

const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

const JobSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate(); 

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => axios.get("http://localhost:5001/jobs").then(res => {
      console.log('Fetched jobs:', res.data.data); 
      return res.data.data; 
    }),
    onError: () => handleOpenSnackbar("Failed to fetch jobs", "error"),
  });

  const filteredJobs = Array.isArray(data) ? data.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleOpenPopup = (job) => {
    setSelectedJob(job);
  };

  const handleClosePopup = () => {
    setSelectedJob(null);
  };

  const handleApply = async () => {
    try {
      await axios.post('http://localhost:5001/appliedJobs', { job: selectedJob });
      navigate('/candidate');
      alert(`You have applied for the ${selectedJob.title} position.`);
    } catch (error) {
      console.error("Failed to apply for job:", error);
      alert("Failed to apply for the job.");
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Box
        component="main"
        sx={{
          ml: 5,
          mr: 5,
          mt: 10,
          flexGrow: 1,
          p: 0,
          transition: 'margin 0.3s ease',
        }}
      >
        <Typography variant="h4" gutterBottom>
          | JOBS
        </Typography>
        <TextField
          sx={{ mb: 2 }}
          variant="outlined"
          fullWidth
          label="Search Jobs"
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Grid container spacing={5}>
          {filteredJobs.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card >
                <CardContent>
                  <Avatar src={job.image} />
                  <Typography variant="h5" component="div">
                    {job.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {truncateText(job.details, 100)} 
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {job.openPositions} open positions
                  </Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => handleOpenPopup(job)} 
                  >
                    More Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {selectedJob && (
          <JobPopup
            job={selectedJob}
            isOpen={!!selectedJob}
            onRequestClose={handleClosePopup}
            onApply={handleApply} 
          />
        )}
      </Box>
    </Box>
  );
};

export default withAuth(JobSearch);
