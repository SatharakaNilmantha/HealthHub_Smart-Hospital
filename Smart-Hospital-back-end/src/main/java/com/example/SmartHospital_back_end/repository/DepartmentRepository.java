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
    Department findById(long departmentId);
    @Modifying
    @Transactional
    @Query("UPDATE Department d SET d.labList = :labList, d.noOfDoctors = :noOfDoctors, d.noOfRooms = :noOfRooms WHERE d.departmentId = :departmentId")
    int updateDepartmentById(long departmentId, java.util.List<String> labList, int noOfDoctors, int noOfRooms);

    @Modifying
    @Transactional
    @Query("DELETE FROM Department d WHERE d.departmentId = :departmentId")
    int deleteDepartmentById(long departmentId);
}
