import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/header";
import { Card, CardContent, CardActions, Button, Collapse, Typography, Box, Container } from '@mui/material';
import withAuth from "../../hooks/useAuth";

const CandidateHome = () => {
    const [openJob, setOpenJob] = useState(false);
    const [openSuggestions, setOpenSuggestions] = useState(false);
    const [openMyAccount, setOpenMyAccount] = useState(false);
    const location = useLocation();
    const appliedJob = location.state?.appliedJob;

    const handleJobClick = () => {
        setOpenJob(!openJob);
    };

    const handleSuggestionsClick = () => {
        setOpenSuggestions(!openSuggestions);
    };

    const handleAccountClick = () => {
        setOpenMyAccount(!openMyAccount)
    }

    return (
        <Box sx={{ display: "flex" }}>
            <Header />
            <Box
                component="main"
                sx={{
                    ml: 5,
                    mr: 5,
                    mt: 10,
                    flexGrow: 1,
                    p: 3,
                    transition: "margin 0.3s ease",
                }}
            >
                <Container>
                    <Typography variant="h4" gutterBottom>
                        | Candidate Home
                    </Typography>

                    
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                My Applications
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Click show more to view all applications
                            </Typography>
                            <Collapse in={openJob}>
                                {appliedJob && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="h6" component="div">
                                            Applied Job
                                        </Typography>
                                        <Typography variant="body1" component="div">
                                            {appliedJob.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {appliedJob.details}
                                        </Typography>
                                    </Box>
                                )}
                            </Collapse>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={handleJobClick}>
                                {openJob ? 'Show Less' : 'Show More'}
                            </Button>
                        </CardActions>
                    </Card>

                    
                    <Card sx={{ mt: 4 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Suggested Jobs
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Click show more to see suggested jobs based on your experience
                            </Typography>
                            <Collapse in={openSuggestions}>
                                <Typography paragraph>
                                    Here you can add additional content for suggested jobs.
                                </Typography>
                                <Typography paragraph>
                                    This can include job listings, descriptions, or other relevant information.
                                </Typography>
                            </Collapse>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={handleSuggestionsClick}>
                                {openSuggestions ? 'Show Less' : 'Show More'}
                            </Button>
                        </CardActions>
                    </Card>

                    <Card sx={{ mt: 4 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                My Account
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Click more details to Update your Personal details, experiences, educations and to upload new CV.
                            </Typography>
                            <Collapse in={openMyAccount}>
                                <Typography paragraph>
                                    Here you can add additional content for suggested jobs.
                                </Typography>
                                <Typography paragraph>
                                    This can include job listings, descriptions, or other relevant information.
                                </Typography>
                            </Collapse>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={handleAccountClick}>
                                {openMyAccount ? 'Show Less' : 'Show More'}
                            </Button>
                        </CardActions>
                    </Card>
                </Container>
            </Box>
        </Box>
    );
};

export default withAuth(CandidateHome);
