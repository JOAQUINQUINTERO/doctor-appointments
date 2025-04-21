export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  photo: string;
  location: string;
  availability: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
}

export interface BookingModalProps {
  doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (time: string) => void;
} 