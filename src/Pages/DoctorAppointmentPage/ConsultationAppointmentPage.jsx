import React from 'react';
import { useLocation } from 'react-router-dom';

function ConsultationAppointmentPage() {
  const location = useLocation();
  const doctorName = location.state?.doctor || "Unknown Doctor";

  return (
    <div>
      <h1>Consultation Appointment</h1>
      <p>Booking appointment with: <strong>{doctorName}</strong></p>
    </div>
  );
}

export default ConsultationAppointmentPage;
