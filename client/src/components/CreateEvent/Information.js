import React, { useEffect, useState } from 'react';

function Information() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');

        if (!isUserLoggedIn) {
            setShowModal(true);
            localStorage.setItem('isUserLoggedIn', true);
        }
    }, []);

    return (
        <div className="information">
            {showModal && (
                <div className="modal">
                    <h2>Bienvenue!</h2>
                    <p>C'est votre première connexion!</p>
                </div>
            )}
            <h1>Connexion première fois
                --- Explication :
                ------- Le créateur bénéficie d'un certain nombre gratuit d'évènements
                ------- Après, il faut choisir un type d'abonnement :
                ------------ abonnement mensuel
                ------------ abonnement ponctuel (un certains nombre d'évènements)
                ------------ abonnement mensuel Supérieur
                ------------ abonnement ponctuel (un certains nombre d'évènements) Supérieur
            </h1>
        </div>
    );
}

export default Information;
