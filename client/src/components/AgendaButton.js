import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Box, Button, Checkbox } from "@mui/material";
import { Container } from "@mui/system";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { AuthContext } from "../context/AuthContext";
import "moment/locale/fr";
moment.locale("fr");

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [agenda, setAgenda] = useState(false);

  console.log(event);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API_URL}/api/event/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const [agendaEvents, setAgendaEvents] = useState([]);

  // Récupérer les données de l'utilisateur à partir de l'API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${userId}`)
      .then((res) => {
        setAgendaEvents(res.data.agendaEvents);
        if (res.data.agendaEvents.includes(id)) {
          setAgenda(true);
        } else {
          setAgenda(false);
        }
      })
      .catch((err) => console.error(err));
  }, [id, userId]);

  const handleAgenda = () => {
    if (!agenda) {
      axios
        .put(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${userId}`, {
          agendaEvents: [...agendaEvents, id],
        })
        .then((res) => {
          setAgenda(true);
          console.log(res);
        })
        .catch((err) => console.error(err));
    }
    if (agenda) {
      const updatedagendas = agendaEvents.filter((fav) => fav !== id);
      axios
        .put(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${userId}`, {
          agendaEvents: updatedagendas,
        })
        .then((res) => {
          setAgenda(false);
          console.log(res);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Container
          disableGutters
          maxWidth="md"
          component="main"
          sx={{ pt: 8, pb: 6 }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Checkbox
              {...label}
              icon={!agenda ? <EventIcon /> : <EventAvailableIcon />}
              onClick={handleAgenda}
            />
            <Button
              variant="contained"
              color={!agenda ? "primary" : "error"}
              onClick={handleAgenda}
            >
              {agenda ? "Retirer de l'agenda" : "Ajouter à l'agenda"}
            </Button>
          </Box>
        </Container>
      </Container>
    </div>
  );
}

export default EventDetail;
