package com.example.SmartHospital_back_end.repository;

import com.example.SmartHospital_back_end.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription ,Long> {

    @Query(value="SELECT* FROM prescription WHERE prescription_id=?1 " ,nativeQuery = true)
    Prescription getPrescriptionById(long prescriptionId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE prescription SET status = ?2 WHERE prescription_id = ?1", nativeQuery = true)
    int updatePrescription(long prescriptionId, String status);
}
