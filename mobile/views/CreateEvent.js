import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvGBV9DUig0t9hvtFy4YcTrouE8S22lQM"></script>;

function CreateEvent() {
  // const { userId, userRole } = useContext(AuthContext);
  const [event, setEvent] = useState({});
  const [nbMaxEvent, setNbMaxEvent] = useState(10);
  const [location, setLocation] = useState("");
  //   const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [coords, setCoords] = useState(null);
  const userId = "test";

  useEffect(() => {
    setEvent((prevState) => {
      return {
        ...prevState,
        country: prevState.country || "",
        city: prevState.city || "",
        theme: prevState.theme || "",
        startDate: prevState.startDate || "",
        endDate: prevState.endDate || "",
        location: location || "",
        creator: userId || "",
        image: "",
        prices: prevState.prices || [],
        ticketLink: prevState.ticketLink || "",
        description: prevState.description || "",
        lat: prevState.lat || "",
        lng: prevState.lng || "",
      };
    });
  }, [userId, location]);

  const REACT_APP_SERVER_API_URL = "http://192.168.1.79:5000"; 

  // console.log(userId, "creatorBefore")

  const [image, setImage] = useState(null);
  const [changeEvent, setChangeEvent] = useState(null);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
    setImage(e.target.files[0]);
    setChangeEvent(e.target.value);
  };

  const [prices, setPrices] = useState([]);

  const handlePriceChange = (index, field, value) => {
    const newPrices = [...prices];
    newPrices[index][field] = value.toString();
    setPrices(newPrices);
    setEvent({ ...event, prices: prices });
  };

  console.log(JSON.stringify(prices), "aaaaaaaaaaaaaaaaa");

  console.log(event, "event");

  const handleAddPrice = () => {
    setPrices([...prices, { title: "", condition: "", price: 0 }]);
  };

  const handleRemovePrice = (index) => {
    const newPrices = [...prices];
    newPrices.splice(index, 1);
    setPrices(newPrices);
  };

  const [speakersCount, setSpeakersCount] = useState(1);

  const handleSpeakersCountChange = (e) => {
    setSpeakersCount(e.target.value);
  };

  const handleSpeakersChange = (e, index) => {
    const newSpeakers = [...event.speakers];
    newSpeakers[index] = e.target.value;
    setEvent({ ...event, speakers: newSpeakers });
  };

  //   useEffect(() => {
  //     const script = document.createElement("script");
  //     script.src = `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_API_KEY_GOOGLE_MAP}&libraries=places`;
  //     script.onload = () => {
  //       const map = new window.google.maps.Map(document.getElementById("map"), {
  //         center: { lat: 0, lng: 0 },
  //         zoom: 2,
  //       });
  //       setMap(map);
  //     };
  //     document.body.appendChild(script);
  //   }, []);

  const handleInputChange = (event) => {
    setLocation(event.target.value);
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: event.target.value }, (results) => {
      setPredictions(results);
    });
  };

  const handlePlaceSelect = (prediction) => {
    // const placeService = new window.google.maps.places.PlacesService(map);
    // placeService.getDetails({ placeId: prediction.place_id }, (placeResult) => {
    //   const lat = placeResult.geometry.location.lat();
    //   const lng = placeResult.geometry.location.lng();
    //   const marker = new window.google.maps.Marker({
    //     position: { lat, lng },
    //     map: map,
    //   });
    //   setMarker(marker);
    //   setCoords({ lat, lng });
    //   map.setCenter({ lat, lng });
    //   map.setZoom(15);
    //   setLocation(prediction.description);
    //   setPredictions(null);
    //   setEvent({
    //     ...event,
    //     country: placeResult.address_components.find((component) =>
    //       component.types.includes("country")
    //     ).long_name,
    //     city: placeResult.address_components.find((component) =>
    //       component.types.includes("locality")
    //     ).long_name,
    //     lat: lat,
    //     lng: lng,
    //   });
    // });
  };

  // console.log(location, "location")
  // console.log(marker, "marker")
  // console.log(predictions, "predictions")
  // console.log(coords, "coords")

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`${REACT_APP_SERVER_API_URL}/api/user`)
      .then((res) => setUsers(res.data));
  }, []);

  users.map((user) => {
    console.log(user._id, "user id");
  });

  React.useEffect(() => {
    axios
      .get(`${REACT_APP_SERVER_API_URL}/api/user/${userId}`)
      .then((res) => setNbMaxEvent(res.data.nbMaxEvent));
  }, [nbMaxEvent]);

  console.log(nbMaxEvent, "nbMaxEvent");

  const handleSubmit = async (e) => {
    e.preventDefault();

    users.map((user) => {
      if (user.eventNotifications) {
        try {
          const existingNotifications = user.notifications || [];
          const updatedNotifications = [...existingNotifications, event.title];
          axios
            .put(`${REACT_APP_SERVER_API_URL}/api/user/${user._id}`, {
              notifications: updatedNotifications,
            })
            .then((res) => console.log(res, "add event notification"));
        } catch (err) {
          console.error(err);
        }
      }
    });

    try {
      axios
        .put(`${REACT_APP_SERVER_API_URL}/api/user/${userId}`, {
          nbMaxEvent: nbMaxEvent - 1,
        })
        .then((res) => console.log(res));
    } catch (err) {
      console.error(err);
    }

    const formData = new FormData();
    formData.append("image", image);
    Object.keys(event).forEach((key) => {
      if (key === "prices") {
        event.prices.forEach((price, index) => {
          formData.append(`prices[${index}][title]`, price.title);
          formData.append(`prices[${index}][price]`, price.price);
          formData.append(`prices[${index}][condition]`, price.condition);
        });
      } else {
        formData.append(key, event[key]);
      }
    });
    try {
      const res = await axios.post(
        `${REACT_APP_SERVER_API_URL}/api/event`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      window.location.href = "/";
    } catch (err) {
      console.log(err, "err");
    }
  };
  return (
    <View>
      {!event ? (
        <View>
          <Text>
            Vous n'avez pas les permissions nécessaires pour accéder à cette
            page !
          </Text>
          <Text>Votre compte n'a pas encore été validé !</Text>
        </View>
      ) : nbMaxEvent === 0 ? (
        <View>
          <Text>
            Vous avez atteint la limite de création d'événement ! Veuillez
            souscrire à un abonnement.
          </Text>
        </View>
      ) : (
        <View>
          <View>
            <Text>Créer un événement</Text>
          </View>
          <View>
            <TextInput
              name="title"
              placeholder="Titre"
              value={event.title}
              onChangeText={(value) => handleChange("title", value)}
            />
          </View>
          <View>
            <Picker
              selectedValue={event.theme}
              onValueChange={(value) => handleChange("theme", value)}
            >
              <Picker.Item label="Choisir un événement" value="" />
              <Picker.Item label="Théâtre" value="Théâtre" />
              <Picker.Item label="Sport" value="Sport" />
              <Picker.Item label="Concert" value="Concert" />
              <Picker.Item label="Festival" value="Festival" />
              <Picker.Item label="Danse" value="Danse" />
              <Picker.Item label="Spectacle" value="Spectacle" />
              <Picker.Item label="Exposition" value="Exposition" />
              <Picker.Item label="Autre" value="Autre" />
            </Picker>
          </View>
          {event.theme === "Théâtre" && (
            <View>
              <TextInput
                name="nbEvent"
                placeholder="Nombre de pièces"
                value={event.nbEvent}
                onChangeText={(value) => handleChange("nbEvent", value)}
              />
              <TextInput
                name="speaker"
                placeholder="Nom du/des comédien(s)"
                value={event.speaker}
                onChangeText={(value) => handleChange("speaker", value)}
              />
              <TextInput
                name="speakerPresentation"
                placeholder="Présentation du/des comédien(s)"
                value={event.speakerPresentation}
                onChangeText={(value) =>
                  handleChange("speakerPresentation", value)
                }
              />
            </View>
          )}
          {event.theme === "Sport" && (
            <View>
              <TextInput
                name="typeEvent"
                placeholder="Type de sport"
                value={event.typeEvent}
                onChangeText={(value) => handleChange("typeEvent", value)}
              />
              <TextInput
                name="nbEvent"
                placeholder="Nombre de matches"
                value={event.nbEvent}
                onChangeText={(value) => handleChange("nbEvent", value)}
              />
            </View>
          )}
          {event.theme === "Autre" && (
            <View>
              <TextInput
                name="capacity"
                placeholder="Capacité d'accueil"
                value={event.capacity}
                onChangeText={(value) => handleChange("capacity", value)}
              />
              <TextInput
                name="speaker"
                placeholder="Nom du/des intervenant(s)"
                value={event.speaker}
                onChangeText={(value) => handleChange("speaker", value)}
              />
              <TextInput
                name="speakerPresentation"
                placeholder="Présentation du/des intervenant(s)"
                value={event.speakerPresentation}
                onChangeText={(value) =>
                  handleChange("speakerPresentation", value)
                }
              />
            </View>
          )}
          <View>
            <TextInput
              name="startDate"
              placeholder="Date de début"
              value={event.startDate}
              onChangeText={(value) => handleChange("startDate", value)}
            />
            <TextInput
              name="endDate"
              placeholder="Date de fin"
              value={event.endDate}
              onChangeText={(value) => handleChange("endDate", value)}
            />
          </View>
          <View>
            {/* <Button title="Upload" onPress={handleImageUpload} /> */}
          </View>
          <View>
            <TextInput
              label="Location"
              value={location}
              onChangeText={handleInputChange}
            />
            {predictions && (
              <View>
                {predictions.map((prediction) => (
                  <Button
                    key={prediction.place_id}
                    title={prediction.description}
                    onPress={() => handlePlaceSelect(prediction)}
                  />
                ))}
              </View>
            )}
          </View>
          <View>
            <TextInput
              name="country"
              placeholder="Pays"
              value={event.country}
              onChangeText={(value) => handleChange("country", value)}
            />
            <TextInput
              name="city"
              placeholder="Ville"
              value={event.city}
              onChangeText={(value) => handleChange("city", value)}
            />
          </View>
          <View>
            <View style={{ height: 400, width: "100%" }} />
          </View>
          {event.prices.map((price, index) => (
            <View key={index}>
              <TextInput
                name={`priceTitle${index}`}
                placeholder="Titre du prix"
                value={price.title}
                onChangeText={(value) =>
                  handlePriceChange(index, "title", value)
                }
              />
              <TextInput
                name={`price${index}`}
                placeholder="Prix"
                value={price.price}
                onChangeText={(value) =>
                  handlePriceChange(index, "price", value)
                }
              />
              <TextInput
                name={`priceCondition${index}`}
                placeholder="Condition"
                value={price.condition}
                onChangeText={(value) =>
                  handlePriceChange(index, "condition", value)
                }
              />
              <Button onPress={() => handleRemovePrice(index)}>
                Retirer un prix
              </Button>
            </View>
          ))}
          <Button onPress={handleAddPrice}>Ajouter un prix</Button>
          <View>
            <TextInput
              id="ticket-link-input"
              label="Lien du ticket"
              type="text"
              name="ticketLink"
              value={event.ticketLink}
              onChangeText={(value) => handleChange("ticketLink", value)}
            />
          </View>
          <View>
            <TextInput
              id="description-input"
              label="Description"
              multiline
              rows={4}
              name="description"
              value={event.description}
              onChangeText={(value) => handleChange("description", value)}
            />
          </View>
          <View>
            <Button title="Créer l'événement" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </View>
  );
}

export default CreateEvent;
