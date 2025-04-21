import { Doctor } from './types';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    rating: 5,
    photo: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
    location: 'Downtown Medical Center',
    availability: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'],
    bookedTimeSlots: [],
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Pediatrics',
    rating: 4,
    photo: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg',
    location: 'Children\'s Hospital',
    availability: ['8:00 AM', '11:00 AM', '1:00 PM', '4:00 PM'],
    bookedTimeSlots: [],
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Neurology',
    rating: 5,
    photo: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg',
    location: 'Neurological Institute',
    availability: ['10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM'],
    bookedTimeSlots: [],
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Dermatology',
    rating: 4,
    photo: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
    location: 'Skin Care Center',
    availability: ['9:00 AM', '1:00 PM', '2:00 PM', '4:00 PM'],
    bookedTimeSlots: [],
  }
];

export const specialties = ['All', 'Cardiology', 'Pediatrics', 'Dermatology', 'Neurology'];