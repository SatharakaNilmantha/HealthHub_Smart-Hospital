package com.example.SmartHospital_back_end.repository;

import com.example.SmartHospital_back_end.entity.Doctor;
import com.example.SmartHospital_back_end.entity.Appointment; // Import Appointment entity
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    boolean existsByEmail(String email);

    boolean existsByFullNameAndPhoneNumberAndDepartmentAndTitle(String fullName, String phoneNumber, String department, String title);

    @Query(value = "SELECT * FROM doctor WHERE doctor_id=?1", nativeQuery = true)
    Doctor getDoctorById(long doctorId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE doctor SET full_name = ?2, address = ?3, gender = ?4, image_url = ?5, phone_number = ?6, degree = ?7, department = ?8, title = ?9, description = ?10, fees = ?11 WHERE doctor_id = ?1", nativeQuery = true)
    int updateDoctorById(long doctorId, String fullName, String address, String gender, String imageUrl, String phoneNumber, String degree, String department, String title, String description, double fees);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM doctor WHERE doctor_id=?1", nativeQuery = true)
    int deleteDoctorById(long doctorId);

    // Add a method to check for appointments associated with a doctor
    @Query("SELECT a FROM Appointment a WHERE a.doctor.doctorId = ?1")
    List<Appointment> findByDoctor_DoctorId(long doctorId);

    // Add a method to find a doctor by email
    @Query("SELECT d FROM Doctor d WHERE d.email = ?1")
    Doctor findByEmail(String email);



}
