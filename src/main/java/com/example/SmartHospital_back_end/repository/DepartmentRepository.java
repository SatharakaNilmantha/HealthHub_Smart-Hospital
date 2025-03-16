package com.example.SmartHospital_back_end.repository;

import com.example.SmartHospital_back_end.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    boolean existsByName(String name); // Check if department name exists

    Optional<Department> findById(Long departmentId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE department SET lab_list = ?2, no_of_doctors = ?3, no_of_rooms = ?4 WHERE department_id = ?1", nativeQuery = true)
    int updateDepartmentById(long departmentId, String labList, int noOfDoctors, int noOfRooms);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM department WHERE department_id = ?1", nativeQuery = true)
    int deleteDepartmentById(long departmentId);
}
