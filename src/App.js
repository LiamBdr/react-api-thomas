import { Router } from './Router';
import React from 'react';
import { BrowserRouter, Navigate } from "react-router-dom";
import axios from 'axios';

export function RequireAuth() {
    const token = localStorage.getItem('token');

    if (token === null) {
        return <Navigate to="/login" replace={true} />;
    }

    axios.get('http://127.0.0.1:8000/api/users/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);

            if (response.status !== 200 || response.data === null) {
                localStorage.removeItem('token');
                return <Navigate to="/login" replace={true} />;
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function App() {
    return (
        <BrowserRouter>
            <RequireAuth />
            <Router />
        </BrowserRouter>
    );
}

export default App;