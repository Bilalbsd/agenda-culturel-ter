import React from "react";
import EventDetail from "../components/EventDetail";
import NavBar from "../components/NavBar";
import EventsList from "../components/EventsList";
import PersonalEvents from "../components/CreatorRole/PersonalEvents";
import Footer from "../components/Footer";

function Events() {
  return (
    <div>
      <NavBar />
      <PersonalEvents />
      <Footer />
    </div>
  );
}

export default Events;
