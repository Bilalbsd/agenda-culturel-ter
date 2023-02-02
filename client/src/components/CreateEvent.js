import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function CreateEvent() {
    const { userId, userRole } = useContext(AuthContext);
    const [event, setEvent] = useState({});

    // On utilise un useEffect pour initialiser 'creator: userId' car sinon on a 'creator: null'
    useEffect(() => {
        setEvent({
            title: '',
            country: '',
            city: '',
            theme: '',
            startDate: '',
            endDate: '',
            location: '',
            creator: userId,
            image: '',
            speakers: [],
            price: 0,
            ticketLink: '',
            description: ''
        });
        // On modifie creator à chaque update de userId
    }, [userId])

    // console.log(userId, "creatorBefore")

    const [image, setImage] = useState(null);

    const handleChange = e => {
        setEvent({ ...event, [e.target.name]: e.target.value });
        setImage(e.target.files[0]);
    };

    const [speakersCount, setSpeakersCount] = useState(1);

    const handleSpeakersCountChange = (e) => {
        setSpeakersCount(e.target.value);
    }

    const handleSpeakersChange = (e, index) => {
        const newSpeakers = [...event.speakers];
        newSpeakers[index] = e.target.value;
        setEvent({ ...event, speakers: newSpeakers });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        // On ajoute les éléments de event dans formData
        Object.keys(event).forEach(key => formData.append(key, event[key]));
        // console.log(image, "image")
        // console.log(formData, "formData")
        try {
            const res = await axios.post('http://localhost:5000/api/event', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            {userRole !== "creator" ? <h1>Vous n'avez pas les permissions nécessaires pour accéder à cette page !</h1> :
                <form onSubmit={handleSubmit}>
                    <label>
                        Titre:
                        <input
                            type="text"
                            name="title"
                            value={event.title}
                            onChange={handleChange}

                        />
                    </label>
                    <br />
                    <label>
                        Pays:
                        <input
                            type="text"
                            name="country"
                            value={event.country}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Ville:
                        <input
                            type="text"
                            name="city"
                            value={event.city}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    {/* <label>
                        Événement:
                        <input
                            type="text"
                            name="theme"
                            value={event.theme}
                            onChange={handleChange}
                            required
                        />
                        </label> */}
                    <label>
                        Événement:
                        <select name="theme" value={event.theme} onChange={handleChange} required>
                            <option value="" disabled>Choisir un événement</option>
                            <option value="Théâtre">Théâtre</option>
                            <option value="Sport">Sport</option>
                            <option value="Concert">Concert</option>
                            <option value="Festival">Festival</option>
                            <option value="Danse">Danse</option>
                            <option value="Spectacle">Spectacle</option>
                            <option value="Exposition">Exposition</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Date de début:
                        <input
                            type="date"
                            name="startDate"
                            value={event.startDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Date de fin:
                        <input
                            type="date"
                            name="endDate"
                            value={event.endDate}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Adresse:
                        <input
                            type="text"
                            name="location"
                            value={event.location}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Image:
                        <input
                            type="file"
                            name="image"
                            value={event.image}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    {/* <label>
                        Intervenants:
                        <input
                            type="text"
                            name="speakers"
                            value={event.speakers}
                            onChange={handleChange}
                        />
                    </label> */}
                    <label>Nombre d'intervenants:
                        <input type="number" value={speakersCount} onChange={handleSpeakersCountChange} min={0} max={10} />
                        {Array.from({ length: speakersCount }, (_, i) => (
                            <div key={i}>
                                <label>Nom de l'intervenant {i + 1} :</label>
                                <input type="text" value={event.speakers[i] || ''} onChange={(e) => handleSpeakersChange(e, i)} />
                            </div>
                        ))}
                    </label>
                    {/* <label>
                        Speakers:
                        <input
                            type="text"
                            name="speakers"
                            value={event.speakers.join(',')}
                            onChange={handleSpeakersChange}
                        />
                    </label> */}
                    <br />
                    <label>
                        Prix:
                        <input
                            type="number"
                            name="price"
                            value={event.price}
                            onChange={handleChange}
                            min={0}
                        />
                    </label>
                    <br />
                    <label>
                        Lien du ticket:
                        <input
                            type="text"
                            name="ticketLink"
                            value={event.ticketLink}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Descritpion:
                        <textarea
                            name="description"
                            value={event.description}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <button type="submit">Create Event</button>
                </form>
            }
        </div>
    );
}

export default CreateEvent;