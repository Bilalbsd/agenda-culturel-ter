import React, { useState } from 'react';
import Register from '../components/Register';
import RegisterCreator from '../components/CreateEvent/Register';

function RegisterPage() {
  const [showRegisterCreator, setShowRegisterCreator] = useState(false);

  const handleRegisterClick = () => {
    setShowRegisterCreator(false);
  };

  const handleRegisterCreatorClick = () => {
    setShowRegisterCreator(true);
  };

  return (
    <div>
      <h2>Register</h2>
      <button onClick={handleRegisterClick}>Register</button>
      <button onClick={handleRegisterCreatorClick}>Register Creator</button>
      {showRegisterCreator ? <RegisterCreator /> : <Register />}
    </div>
  );
}

export default RegisterPage;
