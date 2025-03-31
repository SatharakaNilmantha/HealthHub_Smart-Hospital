package com.example.SmartHospital_back_end.repository;

import com.example.SmartHospital_back_end.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription ,Long> {

    @Query(value="SELECT* FROM prescription WHERE prescription_id=?1 " ,nativeQuery = true)
    Prescription getPrescriptionById(long prescriptionId);
}
