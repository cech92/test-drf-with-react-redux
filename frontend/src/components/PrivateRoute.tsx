import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export type ProtectedRouteProps = {
    isAuthenticated: boolean;
  } & RouteProps;
  
export default function ProtectedRoute({isAuthenticated, ...routeProps}: ProtectedRouteProps) {
    if(isAuthenticated) {
        return <Route {...routeProps} />;
    } else {
        return <Redirect to={{ pathname: '/login' }} />;
    }
};