import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [emailNotFound, setEmailNotFound] = useState("")
  const [passwordNotFound, setPasswordNotFound] = useState("")

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:5000/api/user/login`, formData);
      const { token } = res.data;
      localStorage.setItem('token', token);
      console.log(token, "user")
      window.location.reload()
    } catch (err) {
      setEmailNotFound(err.response.data.errors.email)
      setPasswordNotFound(err.response.data.errors.password)
      console.error(err)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      {emailNotFound === "" ? null : <p>{emailNotFound}</p>}
      <br />
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      {passwordNotFound === "" ? null : <p>{passwordNotFound}</p>}
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
