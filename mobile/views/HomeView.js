import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import {
  Button,
  ButtonGroup,
  Card,
  Chip,
  Icon,
  Image,
  SearchBar,
} from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import "moment/locale/fr";
import { AuthContext } from "../context/AuthContext";
moment.locale("fr");

const HomeView = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("A venir");
  const [refreshing, setRefreshing] = useState(false); // Nouvel état pour gérer le rafraîchissement
  const [userLocation, setUserLocation] = useState(null); // État pour stocker la position de l'utilisateur
  const [geolocationEnabled, setGeolocationEnabled] = useState(false); // État pour vérifier si la géolocalisation est activée

  const REACT_APP_SERVER_API_URL = "http://192.168.1.79:5000";
  const navigation = useNavigation();

  const { userId, userFirstname } = useContext(AuthContext);

  console.log(userId, "userId");

  useEffect(() => {
    fetchEvents();
    fetchUserLocation();
  }, []);

  const fetchEvents = () => {
    axios
      .get(`${REACT_APP_SERVER_API_URL}/api/event`)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setRefreshing(false));
  };

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      setGeolocationEnabled(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      setGeolocationEnabled(false);
    }
  };

  // Définir la longueur maximale pour la description
  const maxLength = 150;

  // Fonction pour raccourcir la description et ajouter "..."
  const shortenDescription = (description) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength).concat("...");
    }
    return description;
  };

  // Fonction pour retirer les accents d'une chaîne de caractères
  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const filterAndSortEvents = (events, searchQuery, sortOrder) => {
    const now = new Date();
    const filteredAndSortedEvents = events
      .filter((event) => {
        // Transformer les chaînes de caractères en minuscules et sans accents
        const title = removeAccents(event.title.toLowerCase());
        const country = removeAccents(event.country.toLowerCase());
        const city = removeAccents(event.city.toLowerCase());
        const theme = removeAccents(event.theme.toLowerCase());

        // Transformer la recherche en minuscules et sans accents
        const query = removeAccents(searchQuery.toLowerCase());

        // Rechercher le texte de la recherche dans les différents attributs inscrits
        return (
          title.indexOf(query) !== -1 ||
          country.indexOf(query) !== -1 ||
          city.indexOf(query) !== -1 ||
          theme.indexOf(query) !== -1 ||
          query.indexOf(title) !== -1 ||
          query.indexOf(country) !== -1 ||
          query.indexOf(city) !== -1 ||
          query.indexOf(theme) !== -1
        );
      })
      .filter((event) => {
        const endDate = new Date(event.endDate);
        const startDate = new Date(event.startDate);

        if (sortOrder === "Passé") {
          return endDate < now;
        } else if (sortOrder === "A venir") {
          return endDate >= now;
        } else if (sortOrder === "Actuel") {
          return startDate <= now && endDate >= now;
        } else {
          return true;
        }
      });
    return filteredAndSortedEvents;
  };

  const buttons = [
    {
      label: "Passé",
      value: "Passé",
    },
    {
      label: "A venir",
      value: "A venir",
    },
    {
      label: "Tous",
      value: "Tous",
    },
  ].map((button) => (
    <Button
      key={button.value}
      variant={sortOrder === button.value ? "primary" : "outline-primary"}
      buttonStyle={{ backgroundColor: "black" }}
      onPress={() => handleSort(button.value)}
      title={button.label}
    />
  ));

  const handleEventClick = (eventId) => {
    navigation.navigate("EventDetails", { eventId });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  const styles = StyleSheet.create({
    chip: {
      backgroundColor: "#e0e0e0",
      padding: 8,
      borderRadius: 8,
      marginBottom: 8,
    },
    chipLabel: {
      textAlign: "center",
      fontSize: 16,
    },
    buttonGroupContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 16,
    },
    buttonGroup: {
      height: 40,
      borderRadius: 8,
    },
  });

  const filteredEvents = filterAndSortEvents(events, searchQuery, sortOrder);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} /> // Utiliser RefreshControl avec les props refreshing et onRefresh
      }
    >
      <SearchBar
        placeholder="Rechercher un événement"
        onChangeText={handleSearchChange}
        lightTheme
        value={searchQuery}
      />
      <View style={styles.buttonGroupContainer}>
        <ButtonGroup
          buttons={buttons}
          
          onPress={buttons.label}
          containerStyle={styles.buttonGroup}
        />
      </View>
      {filteredEvents.map((event) => (
        <TouchableWithoutFeedback
          key={event._id}
          onPress={() => handleEventClick(event._id)}
          style={{ textDecorationLine: "none" }}
        >
          <Card title={event.title} image={event.image}>
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
            <View style={styles.chip}>
              <Text style={styles.chipLabel}>
                {moment(event.startDate).format("ll")} -{" "}
                {moment(event.endDate).format("ll")}
              </Text>
            </View>
            <Text style={{ marginBottom: 10 }}>
              {shortenDescription(event.description)}
            </Text>
          </Card>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );
};

export default HomeView;
