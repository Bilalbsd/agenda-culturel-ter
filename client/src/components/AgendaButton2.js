import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";

const Favorite = ({ event }) => {
    const [isAgenda, setIsAgenda] = useState(false);

    useEffect(() => {
        // Vérifie si l'événement est déjà enregistré dans l'agenda dans le local storage
        const storedAgenda = JSON.parse(localStorage.getItem("agenda"));
        if (storedAgenda && storedAgenda.includes(event._id)) {
            setIsAgenda(true);
        }
    }, [event]);

    const toggleAgenda = () => {
        console.log(event, "event")
        // Ajoute ou supprime l'événement de l'agenda dans le state et le local storage
        const storedAgenda = JSON.parse(localStorage.getItem("agenda")) || [];
        if (isAgenda) {
            const updatedAgenda = storedAgenda.filter(id => id !== event._id);
            localStorage.setItem("agenda", JSON.stringify(updatedAgenda));
        } else {
            const updatedAgenda = [...storedAgenda, event._id];
            localStorage.setItem("agenda", JSON.stringify(updatedAgenda));
        }
        setIsAgenda(!isAgenda);
    };

    return (
        <Button onClick={toggleAgenda}
            variant="contained"
            color={!isAgenda ? "primary" : "error"}>
            {isAgenda ? "Retirer de l'agenda" : "Ajouter à l'agenda"}
        </Button>
    );
};

export default Favorite;