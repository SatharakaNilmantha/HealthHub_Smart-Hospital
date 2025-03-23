package com.example.SmartHospital_back_end.repository;

import com.example.SmartHospital_back_end.entity.FrontDeskRegister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface FrontDeskRegisterRepository extends JpaRepository<FrontDeskRegister, Long> {

    boolean existsByEmail(String email); // Check if a FrontDeskRegister with the given email exists

    // Retrieve a FrontDeskRegister by ID
    Optional<FrontDeskRegister> findById(Long frontDeskId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE front_desk_register SET password = ?2 WHERE front_desk_id = ?1", nativeQuery = true)
    int updateFrontDeskRegisterById(long frontDeskId, String password);


    @Modifying
    @Transactional
    @Query(value = "DELETE FROM front_desk_register WHERE front_desk_id = ?1", nativeQuery = true)
    int deleteFrontDeskRegisterById(long frontDeskId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM front_desk_register WHERE email = ?1", nativeQuery = true)
    int deleteFrontDeskByEmail(String email);
}
