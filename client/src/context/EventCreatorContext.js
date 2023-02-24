import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Création du contexte
export const EventCreatorContext = createContext();

// Composant parent qui fournira le contexte
export const EventCreatorProvider = ({ children }) => {
  // État pour stocker le nombre d'événements créés par l'utilisateur
  const [eventCount, setEventCount] = useState(0);
  
  // État pour stocker le nombre maximum d'événements autorisés
  const [maxEventsAllowed, setMaxEventsAllowed] = useState(0);

  // Récupération du nombre maximum d'événements autorisés depuis l'API REST de MongoDB
  useEffect(() => {
    const fetchMaxEventsAllowed = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/');
        setMaxEventsAllowed(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMaxEventsAllowed();
  }, []);

  // Fonction pour incrémenter le nombre d'événements créés par l'utilisateur
  const incrementEventCount = () => {
    setEventCount(eventCount + 1);
  };

  // Fonction pour vérifier si l'utilisateur peut créer un nouvel événement
  const canCreateEvent = () => {
    return eventCount < maxEventsAllowed;
  };

  // Valeurs à fournir aux composants enfants
  const values = {
    eventCount,
    maxEventsAllowed,
    incrementEventCount,
    canCreateEvent,
  };

  // Rendu du composant avec le contexte
  return (
    <EventCreatorContext.Provider value={values}>
      {children}
    </EventCreatorContext.Provider>
  );
};