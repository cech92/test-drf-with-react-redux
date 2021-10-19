import React from 'react';
import { Route, Redirect } from 'react-router-dom';
  
export default function ProtectedRoute({...routeProps}) {
    console.dir(localStorage.getItem("user"));
    if (localStorage.getItem("user") !== null) {
        return <Route {...routeProps} />;
    } else {
        return <Redirect to={{ pathname: '/login' }} />;
    }
};