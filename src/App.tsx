import React, { useState } from 'react';
import './App.css';
import DoctorCard from './components/DoctorCard';
import BookingModal from './components/BookingModal';
import AppointmentsList from './components/AppointmentsList';
import { Doctor, Appointment } from './types';

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    rating: 5,
    photo: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
    location: 'Downtown Medical Center',
    availability: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'],
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Pediatrics',
    rating: 4,
    photo: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg',
    location: 'Children\'s Hospital',
    availability: ['8:00 AM', '11:00 AM', '1:00 PM', '4:00 PM'],
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Neurology',
    rating: 5,
    photo: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg',
    location: 'Neurological Institute',
    availability: ['10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM'],
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Dermatology',
    rating: 4,
    photo: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
    location: 'Skin Care Center',
    availability: ['9:00 AM', '1:00 PM', '2:00 PM', '4:00 PM'],
  }
];

const specialties = ['All', 'Cardiology', 'Pediatrics', 'Dermatology', 'Neurology'];

function App() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const filteredDoctors = selectedSpecialty === 'All'
    ? mockDoctors
    : mockDoctors.filter(doctor => doctor.specialty === selectedSpecialty);

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
      setAppointments([...appointments, newAppointment]);
      setIsModalOpen(false);
      setSelectedDoctor(null);
    }
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

        <AppointmentsList appointments={appointments} />
      </main>
    </div>
  );
}

export default App;
