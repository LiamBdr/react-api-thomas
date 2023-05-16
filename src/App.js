import React from 'react';
import {Router} from "./Router";
import {BrowserRouter, Navigate} from "react-router-dom";
import axios from "axios";

export function RequireAuth() {
    const token = localStorage.getItem('token');

    if (token === null) {
        return <Navigate to="/login" replace={true}/>;
    } else {

        axios.get('https://127.0.0.1:8000/api/users/me', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Methods': "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data));
            })
            .catch((err) => {
                console.log('ERROR');
                console.log(err);
            })

        return null;
    }
}

function App() {
    return (
        <BrowserRouter>
            <RequireAuth/>
            <Router/>
        </BrowserRouter>
    );
}

export default App;