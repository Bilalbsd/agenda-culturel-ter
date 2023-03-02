import React, { createContext } from 'react';

// Création du contexte
export const SubscriptionContext = createContext();

// Composant parent qui fournira le contexte
export const SubscriptionProvider = ({ children }) => {

    const [supPunctual, setSupPunctual] = React.useState(false);
    const [monthly, setMonthly] = React.useState(false);
    const [supMonthly, setSupMonthly] = React.useState(false);
    const [punctual, setPunctual] = React.useState(false);

    // Valeurs à fournir aux composants enfants
    const values = {
        supPunctual,
        setSupPunctual,
        monthly,
        setMonthly,
        supMonthly,
        setSupMonthly,
        punctual,
        setPunctual
    };

    // Rendu du composant avec le contexte
    return (
        <SubscriptionContext.Provider value={{
            supPunctual,
            setSupPunctual,
            monthly,
            setMonthly,
            supMonthly,
            setSupMonthly,
            punctual,
            setPunctual
        }}>
            {children}
        </SubscriptionContext.Provider>
    );
};