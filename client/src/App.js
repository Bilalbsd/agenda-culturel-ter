import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PersonalEvents from './pages/PersonalEvents';
import Event from './pages/Event';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import Login from './pages/Login';
import Register from './pages/Register';
import Profil from './pages/Profil';
import ManagementPage from './pages/Management';
import Pricing from './pages/Pricing';
import Payment from './pages/Payment';
import NotFound from './pages/NotFound';
import FavoriteEvent from './pages/FavoriteEvent';
import Group from './pages/Group';

// import { AuthContext } from './context/AuthContext';

function App() {

  // const { userRole } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personal-events" element={<PersonalEvents />} />
        <Route path="/favorite" element={<FavoriteEvent />} />
        <Route path="/group" element={<Group />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/events/:id" element={<Event />} />
        <Route path="/create-event" element={<CreateEvent />} /> {/*Il faut avoir le rôle "creator"*/}
        <Route path="/edit-event/:id" element={<EditEvent />} /> {/*Il faut être le créateur de l'event*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/management" element={<ManagementPage />} /> {/*Il faut avoir le rôle de manager*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
