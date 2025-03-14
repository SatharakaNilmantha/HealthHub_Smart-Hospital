package com.example.SmartHospital_back_end.repository;

import com.example.SmartHospital_back_end.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    boolean existsByEmail(String email);   // Check if an Admin with the given email exists


    @Modifying
    @Transactional
    @Query(value = "DELETE FROM admin WHERE admin_id=?1", nativeQuery = true)
    int deleteAdminById(long adminId);
}
