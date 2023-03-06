import React, { createContext, useEffect, useState } from 'react';

// Créer le contexte
export const FirstConnectionContext = createContext();

// Créer un composant qui contient le contexte
export function FirstConnectionProvider(props) {
  const [hasSeenMessage, setHasSeenMessage] = useState(false);

  useEffect(() => {
    // Vérifiez si l'utilisateur a déjà vu le message en lisant une valeur stockée localement
    const storedHasSeenMessage = localStorage.getItem('hasSeenMessage');

    if (!storedHasSeenMessage) {
      // Si l'utilisateur n'a pas encore vu le message, enregistrez la valeur indiquant que l'utilisateur a vu le message pour la prochaine fois
      localStorage.setItem('hasSeenMessage', true);
    } else {
      // Si l'utilisateur a déjà vu le message, mettez à jour l'état pour qu'il soit marqué comme vu
      setHasSeenMessage(true);
    }
  }, []);

  // Passer l'état et un setter dans le contexte
  return (
    <FirstConnectionContext.Provider value={{ hasSeenMessage, setHasSeenMessage }}>
      {props.children}
    </FirstConnectionContext.Provider>
  );
}