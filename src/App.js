import { Router } from './Router';
import React from 'react';
import { BrowserRouter, Navigate } from "react-router-dom";

export function RequireAuth({ children }) {
    const user = localStorage.getItem('token');

    if (user === null) {
        return <Navigate to="/login" replace={true} />;
    } else {
        return children;
    }
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
