import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import { ReactAgenda, ReactAgendaCtrl, guid, Modal } from 'react-agenda';

import 'react-agenda/build/styles.css';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const colors = {
    'color-1': 'rgba(102, 195, 131 , 1)',
    'color-2': 'rgba(242, 177, 52, 1)',
    'color-3': 'rgba(235, 85, 59, 1)'
};

const now = new Date();

const Agenda = () => {
    const [selected, setSelected] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleCellSelection = item => {
        console.log('handleCellSelection', item);
    };

    const handleItemEdit = item => {
        console.log('handleItemEdit', item);
    };

    const handleRangeSelection = item => {
        console.log('handleRangeSelection', item);
    };

    const { userId, userRole, nbMaxEvent, setNbMaxEvent, isAuthenticated } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [agendaIds, setAgendaIds] = useState('');

    useEffect(() => {
        const fetchAgenda = async () => {
            try {
                let agenda = [];
                let eventsRes = await axios.get('http://localhost:5000/api/event');

                if (isAuthenticated) {
                    const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
                    agenda = res.data.agendaEvents;
                } else {
                    agenda = localStorage.getItem("agenda") || [];
                }

                // Filter events based on agendaIds
                const agendaFiltered = eventsRes.data.filter(event => agenda.includes(event._id));

                // Set the state with filtered events
                setEvents(agendaFiltered);
                setAgendaIds(agenda);
                console.log(events, "events")
                console.log(agendaFiltered, "events")
            } catch (err) {
                console.error(err);
            }
        };

        fetchAgenda();
    }, [userId, isAuthenticated]);

    const items = events.map(event => ({
        _id: guid(),
        name: event.title,
        startDateTime: moment(event.startDate).toDate(),
        endDateTime: moment(event.endDate).toDate(),
        classes: `color-1`
    }));

    return (
        <div>
            <ReactAgenda
                minDate={now}
                maxDate={new Date(now.getFullYear(), now.getMonth() + 3)}
                disablePrevButton={false}
                startDate={now}
                cellHeight={35}
                locale="fr"
                items={items}
                numberOfDays={4}
                rowsPerHour={1}
                itemColors={colors}
                autoScale={false}
                fixedHeader={true}
                onItemEdit={handleItemEdit}
                onCellSelect={handleCellSelection}
                onRangeSelection={handleRangeSelection}
            />
        </div>
    );
};

export default Agenda;
