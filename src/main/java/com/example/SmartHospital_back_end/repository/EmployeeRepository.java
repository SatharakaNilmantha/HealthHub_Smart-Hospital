package com.example.SmartHospital_back_end.repository;

import com.example.SmartHospital_back_end.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    boolean existsByEmail(String email);
    boolean existsByFullNameAndPhoneNumberAndDepartmentAndRole(String fullName, String phoneNumber, String department, String role);

    Employee findById(long employeeId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM employee WHERE employee_id = ?1", nativeQuery = true)
    int deleteEmployeeById(long employeeId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE employee SET full_name = ?2, address = ?3, gender = ?4, image = ?5, phone_number = ?6, department = ?7, role = ?8 WHERE employee_id = ?1", nativeQuery = true)
    int updateEmployeeById(long employeeId, String fullName, String address, String gender, String image, String phoneNumber, String department, String role);
}
