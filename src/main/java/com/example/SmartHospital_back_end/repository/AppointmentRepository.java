package com.example.SmartHospital_back_end.repository;

import com.example.SmartHospital_back_end.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {




    // Find appointments by patient ID
    List<Appointment> findByPatient_PatientId(long patientId);

    // Find appointments by patient ID and doctor ID
    List<Appointment> findByPatient_PatientIdAndDoctor_DoctorId(long patientId, long doctorId);


    // Find appointments by doctor ID
    List<Appointment> findByDoctor_DoctorId(long doctorId);


    // Check if a any patient already has an appointment with the same doctor at the same time
    boolean existsByDoctor_DoctorIdAndAppointmentDateTime(long doctorId, LocalDateTime appointmentDateTime);

    @Modifying
    @Transactional
    @Query(value = "UPDATE appointment SET state = ?2 WHERE appointment_id = ?1", nativeQuery = true)
    int UpdateAppointment(long appointmentId, String state);
}
