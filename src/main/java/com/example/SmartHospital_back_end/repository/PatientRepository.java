package com.example.SmartHospital_back_end.repository;

import com.example.SmartHospital_back_end.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDate;

@Repository
public interface PatientRepository extends JpaRepository<Patient , Long> {

    boolean existsByEmail(String email);// Check if a patient with the given email exists

    Patient findByEmail(String email);  // Find a patient by email

    @Query(value="SELECT* FROM patient WHERE patient_id=?1 " ,nativeQuery = true)
    Patient getPatientById(long patientId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE patient SET full_name = ?2, address = ?3, gender = ?4,  phone_number = ?5, dob = ?6 WHERE patient_id = ?1", nativeQuery = true)
    int updatePatientById(long patientId, String fullName, String address, String gender, String phoneNumber, LocalDate dob);

    @Modifying
    @Transactional
    @Query(value = "UPDATE patient SET password = ?2 WHERE patient_id = ?1", nativeQuery = true)
    int updatePatientPassword(long patientId, String password);
}
