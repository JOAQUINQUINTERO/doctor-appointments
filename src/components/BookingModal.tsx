import React, { useState } from 'react';
import { BookingModalProps } from '../types';

const BookingModal: React.FC<BookingModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedTime, setSelectedTime] = useState<string>('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedTime) {
      onConfirm(selectedTime);
      setSelectedTime('');
    }
  };

  const availableTimeSlots = doctor.availability.filter(
    time => !doctor.bookedTimeSlots.includes(time)
  );

  return (
    <div 
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <h2 id="modal-title">Book Appointment with Dr. {doctor.name}</h2>
        <div className="time-slots">
          <h3>Available Time Slots</h3>
          <div className="time-slot-grid" role="radiogroup" aria-label="Available time slots">
            {availableTimeSlots.map((time) => (
              <label
                key={time}
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="time-slot"
                  value={time}
                  checked={selectedTime === time}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  aria-label={`Time slot: ${time}`}
                />
                {time}
              </label>
            ))}
          </div>
        </div>
        <div className="modal-actions">
          <button
            onClick={onClose}
            className="cancel-button"
            aria-label="Cancel booking"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="confirm-button"
            disabled={!selectedTime}
            aria-label="Confirm appointment"
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal; 