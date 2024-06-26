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
import UserManagementPage from './pages/UserManagementPage';
import EventManagementPage from './pages/EventManagementPage';
import Pricing from './pages/Pricing';
import Payment from './pages/Payment';
import NotFound from './pages/NotFound';
import FavoriteEvent from './pages/FavoriteEvent';
import Group from './pages/Group';
import Notification from './pages/Notification';
import AgendaPage from './pages/AgendaPage';
import AdvertPage from './pages/AdvertPage';
import InformationPage from './pages/InformationPage';
import StatisticPage from './pages/StatisticPage';



// import { AuthContext } from './context/AuthContext';

function App() {

  // const { userRole } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personal-events" element={<PersonalEvents />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/statistic" element={<StatisticPage />} />
        <Route path="/favorite" element={<FavoriteEvent />} />
        <Route path="/group" element={<Group />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/add-advert/:id" element={<AdvertPage />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/events/:id" element={<Event />} />
        <Route path="/create-event" element={<CreateEvent />} /> {/*Il faut avoir le rôle "creator"*/}
        <Route path="/edit-event/:id" element={<EditEvent />} /> {/*Il faut être le créateur de l'event*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/user-management" element={<UserManagementPage />} /> {/*Il faut avoir le rôle de manager*/}
        <Route path="/event-management" element={<EventManagementPage />} /> {/*Il faut avoir le rôle de manager*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
