package com.example.SmartHospital_back_end.controller;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.DepartmentDto;
import com.example.SmartHospital_back_end.service.DepartmentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentServices departmentServices;

    @PostMapping("saveDepartment")
    public ResponseEntity<String> saveDepartment(@RequestBody DepartmentDto departmentDto) {
        try {
            String response = departmentServices.saveDepartment(departmentDto);
            return ResponseEntity.ok(response);
        } catch (DuplicateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getDepartments")
    public ResponseEntity<?> getAllDepartments() {
        try {
            List<DepartmentDto> departmentList = departmentServices.getAllDepartments();
            return ResponseEntity.ok(departmentList);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("{departmentId}")
    public ResponseEntity<?> updateDepartment(@PathVariable long departmentId, @RequestBody DepartmentDto departmentDto) {
        try {
            String updateResponse = departmentServices.updateDepartment(departmentId, departmentDto);
            return new ResponseEntity<>(updateResponse, HttpStatus.OK);
        } catch (DuplicateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("{departmentId}")
    public ResponseEntity<String> deleteDepartmentById(@PathVariable long departmentId) {
        try {
            String confirmResponse = departmentServices.deleteDepartmentById(departmentId);
            return ResponseEntity.ok(confirmResponse);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
