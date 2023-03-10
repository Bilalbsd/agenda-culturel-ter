import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";

const Favorite = ({ event }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // Vérifie si l'événement est déjà enregistré en favori dans le local storage
        const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
        if (storedFavorites && storedFavorites.includes(event._id)) {
            setIsFavorite(true);
        }
    }, [event]);

    const toggleFavorite = () => {
        console.log(event, "event")
        // Ajoute ou supprime l'événement des favoris dans le state et le local storage
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (isFavorite) {
            const updatedFavorites = storedFavorites.filter(id => id !== event._id);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        } else {
            const updatedFavorites = [...storedFavorites, event._id];
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <Button onClick={toggleFavorite}
            variant="contained"
            color={!isFavorite ? "primary" : "error"}>
            {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        </Button>
    );
};

export default Favorite;