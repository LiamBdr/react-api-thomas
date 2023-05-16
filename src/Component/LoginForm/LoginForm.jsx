import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import Input from '../Input/Input';

const LoginForm = ({ handleSubmit }) => {
  const [credentials, setCredentials] = useState({
    login: '',
    password: ''
  });

  const handleChange = (key, value) => {
    setCredentials((prevState) => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleLoginChange = (event) => {
    const { value } = event.currentTarget;
    handleChange('login', value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.currentTarget;
    handleChange('password', value);
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const data = {
      username: credentials.login,
      password: credentials.password
    };

    try {
      const response = await axios.post('https://127.0.0.1:8000/api/login_check', data);
      const { token } = response.data;
      localStorage.setItem('token', token);
      window.location.href = '/';
    } catch (error) {
      console.log(error.response.data);
      localStorage.removeItem('token');
    }

    await handleSubmit(credentials);
  };

  return (
    <>
      <form id="login-form" onSubmit={handleSubmitForm}>
        <div className='credentials-and-password-container'>
          <Input
            id='login'
            label='Email'
            value={credentials.login}
            type='text'
            required={true}
            placeholder='Email'
            handleChange={handleLoginChange}
          />
          <Input
            id='password'
            label='Mot de passe'
            value={credentials.password}
            type='password'
            required={true}
            placeholder='Mot de passe'
            handleChange={handlePasswordChange}
          />
          <button
            className='login-page-call-to-action'
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;