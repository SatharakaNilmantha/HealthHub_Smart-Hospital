package com.example.SmartHospital_back_end.controller;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.EmployeeDto;
import com.example.SmartHospital_back_end.service.EmployeeServices;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeServices employeeServices;

    // Save Employee with Image
    @PostMapping("saveEmployee")
    public ResponseEntity<String> saveEmployee(@RequestParam("employee") String employeeDtoJson,
                                               @RequestParam("image") MultipartFile image) {
        try {
            EmployeeDto employeeDto = new ObjectMapper().readValue(employeeDtoJson, EmployeeDto.class);
            return ResponseEntity.ok(employeeServices.saveEmployee(employeeDto, image));
        } catch (DuplicateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    // Get All Employees
    @GetMapping("getAllEmployee")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        return ResponseEntity.ok(employeeServices.getAllEmployees());
    }

    // Get Employee by ID
    @GetMapping("{employeeId}")
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

    // Update Employee with Image
    @PutMapping("{employeeId}")
    public ResponseEntity<?> updateEmployee(@PathVariable long employeeId,
                                            @RequestParam("employee") String employeeDtoJson,
                                            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            EmployeeDto employeeDto = new ObjectMapper().readValue(employeeDtoJson, EmployeeDto.class);
            String updateResponse = employeeServices.updateEmployee(employeeId, employeeDto, image);
            return ResponseEntity.ok(updateResponse);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }


    // Delete Employee by ID
    @DeleteMapping("{employeeId}")
    public ResponseEntity<String> deleteEmployeeById(@PathVariable long employeeId) {
        return ResponseEntity.ok(employeeServices.deleteEmployeeById(employeeId));
    }
}
