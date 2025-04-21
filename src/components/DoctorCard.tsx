import React from 'react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment }) => {
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
        <p className="doctor-availability" aria-label={`Availability: ${doctor.availability.join(', ')}`}>
          Available: {doctor.availability.join(', ')}
        </p>
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