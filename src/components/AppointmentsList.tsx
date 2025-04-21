import React from 'react';
import { Appointment } from '../types';

interface AppointmentsListProps {
  appointments: Appointment[];
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ appointments }) => {
  return (
    <div className="appointments-list" role="region" aria-label="My Appointments">
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <ul className="appointments-grid">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="appointment-card"
              role="article"
              aria-label={`Appointment with Dr. ${appointment.doctorName}`}
            >
              <h3>{appointment.doctorName}</h3>
              <p>Specialty: {appointment.specialty}</p>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
              <p>Location: {appointment.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentsList; 