import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, Image } from "react-native";

const EventDetails = ({ route }) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);

  const REACT_APP_SERVER_API_URL = "http://192.168.1.79:5000";

  useEffect(() => {
    axios
      .get(`${REACT_APP_SERVER_API_URL}/api/event/${eventId}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => console.error(err));
  }, [eventId]);

  if (!event) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View>
      <Image
        source={{ uri: event.image }}
        style={{ width: "100%", height: 200 }}
      />
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 22,
        }}
      >
        {event.title}
      </Text>
      <Text style={{ textAlign: "center" }}>
        {event.description}
      </Text>
    </View>
  );
};

export default EventDetails;
