// import axios from 'axios';
// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const Notification = () => {
//     const [events, setEvents] = useState([]);
//     const [users, setUsers] = useState([]);

//     const [notifications, setNotifications] = useState([]);

//     const { userId, userRole, userFirstname, userLastname, isAuthenticated } = useContext(AuthContext);


//     useEffect(() => {
//         axios.get(`http://localhost:5000/api/event`)
//             .then(res => {
//                 setEvents(res.data);
//             })
//     }, []);

//     useEffect(() => {
//         axios.get(`http://localhost:5000/api/user`)
//             .then(res => {
//                 setUsers(res.data);
//             })
//     }, []);


//     // Notification pour la promotion
//     useEffect(() => {
//         events.forEach(event => {
//             if (event.inPromotion) {
//                 users.forEach(user => {
//                     if (user.promoNotification) {

//                         let newNotification = {
//                             eventId: event._id,
//                             message: `Un nouvel événement ${event.name} est en promotion !`,
//                             timestamp: Date.now()
//                         }

//                         axios.put(`http://localhost:5000/api/user`, {
//                             notifications: [...notifications, newNotification]
//                         })
//                             .then(res => {
//                                 setNotifications([...notifications, newNotification]);
//                                 console.log(res.data);
//                             })
//                             .catch(err => {
//                                 console.log(err);
//                             });
//                     }
//                 });
//             }
//         });
//     }, [events, users]);


//     // Notification pour la ville à proximité
//     useEffect(() => {
//         events.forEach(event => {
//             users.forEach(user => {
//                 if (event.city === user.city) {
//                     if (user.proximityNotification) {
//                         let newNotification = {
//                             eventId: event._id,
//                             message: `Un nouvel événement ${event.name} est proche de chez vous !`,
//                             timestamp: Date.now()
//                         }

//                         axios.put(`http://localhost:5000/api/user`, {
//                             notifications: [...notifications, newNotification]
//                         })
//                             .then(res => {
//                                 setNotifications([...notifications, newNotification]);
//                                 console.log(res.data);
//                             })
//                             .catch(err => {
//                                 console.log(err);
//                             });
//                     }
//                 }
//             });
//         });
//     }, [events, users]);

//     const handlePromoNotificationChange = (event) => {
//         const checked = event.target.checked;
//         axios.put(`http://localhost:5000/api/user/${userId}`, {
//             promoNotification: checked
//         })
//             .then(res => {
//                 console.log(res.data);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     const handleProximityNotificationChange = (event) => {
//         const checked = event.target.checked;
//         axios.put(`http://localhost:5000/api/user/${userId}`, {
//             proximityNotification: checked
//         })
//             .then(res => {
//                 console.log(res.data);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     return (
//         <>
//             {users.map(user => {
//                 return (
//                 <div>
//                     <h1>Notification</h1>
//                     <div>

//                         <label>
//                             <input type="checkbox" checked={user.promoNotification} onChange={handlePromoNotificationChange} />
//                             Activer les notifications pour les promotions
//                         </label>
//                     </div>
//                     <div>
//                         <label>
//                             <input type="checkbox" checked={user.proximityNotification} onChange={handleProximityNotificationChange} />
//                             Activer les notifications pour la proximité
//                         </label>
//                     </div>
//                 </div>
//                 )
//             })}
//         </>
//     );
// }

// export default Notification;
