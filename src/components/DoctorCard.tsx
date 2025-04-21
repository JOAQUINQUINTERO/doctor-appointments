import React from 'react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment }) => {
  const availableSlots = doctor.availability.filter(
    time => !doctor.bookedTimeSlots.includes(time)
  );
  const bookedSlots = doctor.bookedTimeSlots;

  return (
    <div 
      className="doctor-card"
      role="article"
      aria-label={`Doctor profile for ${doctor.name}`}
    >
      <img 
        src={doctor.photo} 
        alt={`${doctor.name}'s profile`} 
        className="doctor-photo"
        aria-label={`Photo of Dr. ${doctor.name}`}
      />
      <div className="doctor-info">
        <h2 className="doctor-name">{doctor.name}</h2>
        <p className="doctor-specialty" aria-label={`Specialty: ${doctor.specialty}`}>
          {doctor.specialty}
        </p>
        <p className="doctor-rating" aria-label={`Rating: ${doctor.rating} stars`}>
          {'★'.repeat(doctor.rating)}
        </p>
        <p className="doctor-location" aria-label={`Location: ${doctor.location}`}>
          {doctor.location}
        </p>
        <div className="doctor-availability-container">
          <p className="doctor-availability-label">Available Time Slots:</p>
          <div className="time-slots-display">
            {availableSlots.map((time) => (
              <span key={time} className="available-slot">{time}</span>
            ))}
            {bookedSlots.map((time) => (
              <span key={time} className="booked-slot">{time}</span>
            ))}
          </div>
        </div>
        <button
          className="book-button"
          onClick={() => onBookAppointment(doctor)}
          aria-label={`Book appointment with Dr. ${doctor.name}`}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard; 