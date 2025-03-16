package com.example.SmartHospital_back_end.controller;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.RegisterDoctorDto;
import com.example.SmartHospital_back_end.service.RegisterDoctorServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/registerDoctors")
public class RegisterDoctorController {

    @Autowired
    private RegisterDoctorServices registerDoctorServices;

    @PostMapping("saveDoctor")
    public ResponseEntity<String> saveDoctor(@RequestBody RegisterDoctorDto registerDoctorDto) {
        try {
            String response = registerDoctorServices.saveDoctor(registerDoctorDto);
            return ResponseEntity.ok(response);
        } catch (DuplicateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getDoctors")
    public ResponseEntity<?> getAllDoctors() {
        try {
            List<RegisterDoctorDto> doctorList = registerDoctorServices.getAllDoctors();
            return ResponseEntity.ok(doctorList);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("{doctorId}")
    public ResponseEntity<?> updateDoctor(@PathVariable long doctorId, @RequestBody RegisterDoctorDto registerDoctorDto) {
        try {
            String updateResponse = registerDoctorServices.updateDoctor(doctorId, registerDoctorDto);
            return ResponseEntity.ok(updateResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @DeleteMapping("{doctorId}")
    public ResponseEntity<String> deleteDoctorById(@PathVariable long doctorId) {
        try {
            String confirmResponse = registerDoctorServices.deleteDoctorById(doctorId);
            return ResponseEntity.ok(confirmResponse);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
