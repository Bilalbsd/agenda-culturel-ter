import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./context/AuthContext"; // Import du composant AuthProvider modifié
import HomeView from "./views/HomeView";
import EventDetails from "./views/EventDetails";
import CreateEvent from "./views/CreateEvent";

function HomeScreen() {
  return <HomeView />;
}

function CreateEventScreen() {
  return (
    <CreateEvent />
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text>CreateEvent!</Text>
    // </View>
  );
}

function MyEventsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>MyEvents!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function EventDetailsScreen() {
  return <EventDetails />;
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Créer Événement" component={CreateEventScreen} />
      <Tab.Screen name="Mes Événements" component={MyEventsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function MyStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="EventDetails" component={EventDetails} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrappez votre application avec le composant AuthProvider */}
      <NavigationContainer>
        <MyStacks />
      </NavigationContainer>
    </AuthProvider>
  );
}
