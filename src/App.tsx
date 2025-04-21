import React, { useState } from 'react';
import './App.css';
import DoctorCard from './components/DoctorCard';
import BookingModal from './components/BookingModal';
import AppointmentsList from './components/AppointmentsList';
import { Doctor, Appointment } from './types';
import { mockDoctors, specialties } from './mockData';

function App() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);

  const filteredDoctors = selectedSpecialty === 'All'
    ? doctors
    : doctors.filter(doctor => doctor.specialty === selectedSpecialty);

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleConfirmAppointment = (time: string) => {
    if (selectedDoctor) {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        date: new Date().toLocaleDateString(),
        time,
        location: selectedDoctor.location,
      };
      
      // Update the doctor's booked time slots
      const updatedDoctors = doctors.map(doctor => {
        if (doctor.id === selectedDoctor.id) {
          return {
            ...doctor,
            bookedTimeSlots: [...doctor.bookedTimeSlots, time]
          };
        }
        return doctor;
      });

      setDoctors(updatedDoctors);
      setAppointments([...appointments, newAppointment]);
      setIsModalOpen(false);
      setSelectedDoctor(null);
    }
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    const appointmentToDelete = appointments.find(app => app.id === appointmentId);
    if (!appointmentToDelete) return;

    const updatedAppointments = appointments.filter(app => app.id !== appointmentId);
    setAppointments(updatedAppointments);

    const updatedDoctors = doctors.map(doctor => {
      if (doctor.id === appointmentToDelete.doctorId) {
        return {
          ...doctor,
          bookedTimeSlots: doctor.bookedTimeSlots.filter(time => time !== appointmentToDelete.time)
        };
      }
      return doctor;
    });

    setDoctors(updatedDoctors);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Doctor Appointment System</h1>
      </header>
      
      <main>
        <section className="filters">
          <label htmlFor="specialty-filter">Filter by Specialty:</label>
          <select
            id="specialty-filter"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            aria-label="Select specialty to filter doctors"
          >
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </section>

        <section className="doctors-grid">
          {filteredDoctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={handleBookAppointment}
            />
          ))}
        </section>

        {selectedDoctor && (
          <BookingModal
            doctor={selectedDoctor}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmAppointment}
          />
        )}

        <AppointmentsList 
          appointments={appointments} 
          onDeleteAppointment={handleDeleteAppointment}
        />
      </main>
    </div>
  );
}

export default App;
