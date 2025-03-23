package com.example.SmartHospital_back_end.repository;

import com.example.SmartHospital_back_end.entity.RegisterDoctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface RegisterDoctorRepository extends JpaRepository<RegisterDoctor, Long> {

    boolean existsByEmail(String email); // Check if a doctor with the given email exists

    Optional<RegisterDoctor> findById(Long doctorId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE register_doctor SET password = ?2 WHERE doctor_id = ?1", nativeQuery = true)
    int updateDoctorById(long doctorId, String password);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM register_doctor WHERE doctor_id = ?1", nativeQuery = true)
    int deleteDoctorById(long doctorId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM register_doctor WHERE email = ?1", nativeQuery = true)
    int deleteDoctorByEmail(String email);
}
