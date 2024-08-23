import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const fetchUser = async (uuid, token, stepComplete) => {
  const response = await axios.get(`http://localhost:5001/GetUserByID/${uuid}?stepComplete=${stepComplete}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const [searchParams] = useSearchParams();
    const uuid = searchParams.get("UID");
    const token = localStorage.getItem("token");
    const stepComplete = searchParams.get("stepComplete");

    const { data: user, isLoading, isError, error } = useQuery({
      queryKey: ['user', uuid, stepComplete],
      queryFn: () => fetchUser(uuid, token, stepComplete),
      enabled: !!token && !!uuid && !!stepComplete, 
      retry: false,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return <WrappedComponent {...props} user={user} />;
  };

  return WithAuth;
};

export default withAuth;
