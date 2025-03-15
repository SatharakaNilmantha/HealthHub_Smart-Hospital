package com.example.SmartHospital_back_end.controller;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.EmployeeDto;
import com.example.SmartHospital_back_end.service.EmployeeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeServices employeeServices;

    @PostMapping("saveEmployee")
    public ResponseEntity<String> saveEmployee(@RequestBody EmployeeDto employeeDto) {
        try {
            return ResponseEntity.ok(employeeServices.savedEmployee(employeeDto));
        } catch (DuplicateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("getAllEmployee")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        return ResponseEntity.ok(employeeServices.AllEmployee());
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<?> getEmployeeById(@PathVariable long employeeId) {
        try {
            EmployeeDto employee = employeeServices.getEmployeeById(employeeId);
            return ResponseEntity.ok(employee);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    // Update Employee
    @PutMapping("/{employeeId}")
    public ResponseEntity<?> updateEmployee(@PathVariable long employeeId, @RequestBody EmployeeDto employeeDto) {
        try {
            String updateResponse = employeeServices.updateEmployee(employeeId, employeeDto);
            return ResponseEntity.ok(updateResponse);  // Return 200 OK with success message
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @DeleteMapping("{employeeId}")
    public ResponseEntity<String> deleteEmployeeById(@PathVariable long employeeId) {
        return ResponseEntity.ok(employeeServices.deleteEmployeeById(employeeId));
    }
}
