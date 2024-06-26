import React, { useState } from "react";
import moment from "moment";
import { ReactAgenda, ReactAgendaCtrl, guid, Modal } from "react-agenda";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useEffect } from "react";

require("../styles/index.css");
require("moment/locale/fr.js");

const colors = {
  "color-1": "rgba(102, 195, 131 , 1)",
  "color-2": "rgba(242, 177, 52, 1)",
  "color-3": "rgba(235, 85, 59, 1)",
  "color-4": "rgba(70, 159, 213, 1)",
  "color-5": "rgba(170, 59, 123, 1)",
};

const now = new Date();

const Agenda = () => {
  const { userId, isAuthenticated } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [agendaIds, setAgendaIds] = useState("");
  
  console.log(agendaIds);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        let agenda = [];
        let eventsRes = await axios.get(
          `${process.env.REACT_APP_SERVER_API_URL}/api/event`
        );

        if (isAuthenticated) {
          const res = await axios.get(
            `${process.env.REACT_APP_SERVER_API_URL}/api/user/${userId}`
          );
          agenda = res.data.agendaEvents;
        } else {
          agenda = localStorage.getItem("agenda") || [];
        }

        // Filter events based on agendaIds
        const agendaFiltered = eventsRes.data.filter((event) =>
          agenda.includes(event._id)
        );

        // Set the state with filtered events
        setEvents(agendaFiltered);
        setAgendaIds(agenda);
        console.log(events, "events");
        console.log(agendaFiltered, "events");
      } catch (err) {
        console.error(err);
      }
    };

    fetchAgenda();
  }, [events, userId, isAuthenticated]);

  let items = events.map((event) => ({
    _id: guid(),
    name: event.title,
    startDateTime: moment(event.startDate).toDate(),
    endDateTime: moment(event.endDate).toDate(),
    classes: `color-1`,
  }));

  const [state, setState] = useState({
    items,
    selected: [],
    cellHeight: 60 / 4,
    showModal: false,
    locale: "fr",
    rowsPerHour: 4,
    numberOfDays: 7,
    startDate: new Date(),
  });

  const handleRangeSelection = (selected) => {
    setState({ ...state, selected, showCtrl: true, showModal: true });
  };

  const handleItemEdit = (item, openModal) => {
    if (item && openModal === true) {
      setState({ ...state, selected: [item], showModal: true });
    }
  };

  const handleCellSelection = (item, openModal) => {
    if (state.selected && state.selected[0] === item) {
      setState({ ...state, showModal: true });
    } else {
      setState({ ...state, selected: [item] });
    }
  };

  const _openModal = () => {
    setState({ ...state, showModal: true });
  };

  const _closeModal = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setState({ ...state, showModal: false });
  };

  const handleDateRangeChange = (startDate) => {
    setState({ ...state, startDate });
  };

  const zoomIn = () => {
    setState({ ...state, cellHeight: state.cellHeight + 15 });
  };

  const zoomOut = () => {
    setState({ ...state, cellHeight: state.cellHeight - 15 });
  };

  const handleItemChange = (items, item) => {
    setState({ ...state, items });
  };

  const handleItemSize = (items, item) => {
    setState({ ...state, items });
  };

  const removeEvent = (items, item) => {
    setState({ ...state, items });
  };

  const addNewEvent = (items, newItems) => {
    setState({ ...state, showModal: false, selected: [], items });
  };

  const editEvent = (items, item) => {
    setState({ ...state, showModal: false, selected: [], items });
  };

  const changeView = (days) => {
    setState({ ...state, numberOfDays: days });
  };

  return (
    <div className="content-expanded">
      <div className="control-buttons">
        <button className="button-control" onClick={zoomIn}>
          <i className="zoom-plus-icon"></i>
        </button>
        <button className="button-control" onClick={zoomOut}>
          <i className="zoom-minus-icon"></i>
        </button>
        <button className="button-control" onClick={_openModal}>
          <i className="schedule-icon"></i>
        </button>
        <button className="button-control" onClick={() => changeView(7)}>
          {moment.duration(7, "days").humanize()}
        </button>
        <button className="button-control" onClick={() => changeView(4)}>
          {moment.duration(4, "days").humanize()}
        </button>
        <button className="button-control" onClick={() => changeView(3)}>
          {moment.duration(3, "days").humanize()}
        </button>
        <button className="button-control" onClick={() => changeView(1)}>
          {moment.duration(1, "day").humanize()}
        </button>
      </div>

      <ReactAgenda
        minDate={new Date(now.getFullYear(), now.getMonth() - 3)}
        maxDate={new Date(now.getFullYear(), now.getMonth() + 3)}
        startDate={state.startDate}
        startAtTime={8}
        endAtTime={23}
        cellHeight={state.cellHeight}
        locale="fr"
        items={items}
        numberOfDays={state.numberOfDays}
        headFormat={"ddd DD MMM"}
        rowsPerHour={state.rowsPerHour}
        itemColors={colors}
        helper={true}
        view="calendar"
        autoScale={false}
        fixedHeader={true}
        onRangeSelection={handleRangeSelection}
        onChangeEvent={handleItemChange}
        onChangeDuration={handleItemSize}
        onItemEdit={handleItemEdit}
        onCellSelect={handleCellSelection}
        onItemRemove={removeEvent}
        onDateRangeChange={handleDateRangeChange}
      />

      {state.showModal ? (
        <Modal clickOutside={_closeModal}>
          <div className="modal-content">
            <ReactAgendaCtrl
              items={state.items}
              itemColors={colors}
              selectedCells={state.selected}
              Addnew={addNewEvent}
              edit={editEvent}
            />
          </div>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default Agenda;
