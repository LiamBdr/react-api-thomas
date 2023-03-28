import { Router } from './Router';
import React from 'react';
import { BrowserRouter, Navigate } from "react-router-dom";

export function RequireAuth({ children }) {
    // Get user from local storage
    const user = null;

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
