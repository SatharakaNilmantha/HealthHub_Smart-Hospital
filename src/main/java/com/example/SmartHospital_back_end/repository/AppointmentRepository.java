package com.example.SmartHospital_back_end.repository;

import com.example.SmartHospital_back_end.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Check if a patient already has an appointment with the same doctor at the same time
    boolean existsByPatient_PatientIdAndDoctor_DoctorIdAndAppointmentDate(long patientId, long doctorId, LocalDateTime appointmentDate);

    // Find appointments by patient ID
    List<Appointment> findByPatient_PatientId(long patientId);

    // Find appointments by doctor ID
    List<Appointment> findByDoctor_DoctorId(long doctorId);
}
