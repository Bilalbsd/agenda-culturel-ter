import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Event from './pages/Event';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import Login from './pages/Login';
import Register from './pages/Register';
import Profil from './pages/Profil';
import ManagementPage from './pages/Management';
import NotFound from './pages/NotFound';

import { AuthContext } from './context/AuthContext';

function App() {

  const { userRole } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<Event />} />
        <Route path="/create-event" element={<CreateEvent />} /> {/*Il faut avoir le rôle "creator"*/}
        <Route path="/edit-event/:id" element={<EditEvent />} /> {/*Il faut être le créateur de l'event*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/management" element={<ManagementPage />} role={userRole} /> {/*Il faut avoir le rôle de manager*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
