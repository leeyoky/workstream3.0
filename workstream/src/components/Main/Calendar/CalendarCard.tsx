import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timegridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import './CalendarCard.css';
/* import { useState } from 'react'; */

const CalendarCard = () => {
  /*   const [event, setEvent] = useState([
    { title: 'event 1', date: '2024-02-06' },
    { title: 'event 2', date: '2024-02-06' },
  ]); */

  const event = [
    { title: 'event 1', date: '2024-02-06' },
    { title: 'event 2', date: '2024-02-06' },
  ];

  const customToolbar = {
    left: 'prev,today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,list,next',
  };

  return (
    <div className="calender-wrapper _card">
      <div className="inner-box">
        <div className="inner-box__title">
          <div>
            <i className="fa-regular fa-calendar"></i>
            <span>일정</span>
          </div>
          <button className="btn btn-border">일정 추가</button>
        </div>
        <div className="calender-box">
          {/* 
            fixedWeekCount : If true, the calendar will always be 6 weeks tall. If false, the calendar will have either 4, 5, or 6 weeks, depending on the month.
          */}
          <FullCalendar
            plugins={[dayGridPlugin, timegridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridMonth"
            fixedWeekCount={false}
            height="100%"
            aspectRatio={3}
            contentHeight="220px"
            events={event}
            headerToolbar={customToolbar}
            titleFormat={{ year: 'numeric', month: 'short' }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
