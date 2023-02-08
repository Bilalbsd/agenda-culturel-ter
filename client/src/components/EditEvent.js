import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';

function EditEvent() {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/event/${id}`)
            .then(res => setEvent(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleChange = e => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const handleSpeakersChange = (e, index) => {
        let speakers = e.target.value.split(',')
        setEvent({ ...event, [e.target.name]: speakers });
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/event/${id}`, event)
            .then(res => console.log(res))
            .catch(err => console.error(err));
    };

    const handleDelete = id => {
        axios
            .delete(`http://localhost:5000/api/event/${id}`)
            .then(res => {
                setEvent(event.filter(elem => elem._id !== id));
            })
            .catch(err => console.error(err));
    };



    // console.log(event.creator === userId, "true si Id du créateur de l'event a le même Id de l'user connecté")

    return (
        <div>
            {event.creator !== userId ? <h1>Vous ne pouvez pas éditer cet évènement !</h1> :
                <form onSubmit={handleSubmit}>
                    <label>
                        Titre:
                        <input
                            type="text"
                            name="title"
                            value={event.title}
                            onChange={handleChange}
                            required
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
                            value={moment(event.startDate).format('YYYY-MM-DD')}
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
                            value={moment(event.endDate).format('YYYY-MM-DD')}
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
                    <div>
                        <img src={event.image} alt="img de l'évènement" style={{ width: "150px", height: "150px" }} />
                        <input type="button" value="Supprimer" onClick={() => event.image = ''} />
                    </div>
                    <br />
                    <label>
                        Intervenants:
                        <input
                            type="text"
                            name="speakers"
                            value={event.speakers.join(', ')}
                            onChange={handleSpeakersChange}
                        />
                    </label>
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
                    <button type="submit">Valider</button>
                    <button onClick={() => handleDelete(event._id)}>Supprimer</button>
                </form>
            }
        </div>
    );
}
export default EditEvent;