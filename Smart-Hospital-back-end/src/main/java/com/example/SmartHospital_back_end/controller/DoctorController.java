package com.example.SmartHospital_back_end.controller;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.DoctorDto;
import com.example.SmartHospital_back_end.service.DoctorServices;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    @Autowired
    private DoctorServices doctorServices;

    // Save Doctor with Image
    @PostMapping("saveDoctor")
    public ResponseEntity<String> saveDoctor(@RequestParam("doctor") String doctorDtoJson,
                                             @RequestParam("image") MultipartFile imageFile) {
        try {
            DoctorDto doctorDto = new ObjectMapper().readValue(doctorDtoJson, DoctorDto.class);
            return ResponseEntity.ok(doctorServices.saveDoctor(doctorDto, imageFile));
        } catch (DuplicateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    // Get All Doctors
    @GetMapping("getAllDoctors")
    public ResponseEntity<List<DoctorDto>> getAllDoctors() {
        return ResponseEntity.ok(doctorServices.getAllDoctors());
    }

    // Get Doctor by ID
    @GetMapping("{doctorId}")
    public ResponseEntity<?> getDoctorById(@PathVariable long doctorId) {
        try {
            DoctorDto doctor = doctorServices.getDoctorById(doctorId);
            return ResponseEntity.ok(doctor);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }


    // Get Doctor by ID
    @GetMapping("getDoctorByEmail/{email}")
    public ResponseEntity<?> getDoctorByEmail(@PathVariable String email) {
        try {
            DoctorDto doctor = doctorServices.getDoctorByEmail(email);
            return ResponseEntity.ok(doctor);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    // Update Doctor with Image
    @PutMapping("{doctorId}")
    public ResponseEntity<?> updateDoctor(@PathVariable long doctorId,
                                          @RequestParam("doctor") String doctorDtoJson,
                                          @RequestParam(value = "image", required = false) MultipartFile imageFile) {
        try {
            DoctorDto doctorDto = new ObjectMapper().readValue(doctorDtoJson, DoctorDto.class);
            String updateResponse = doctorServices.updateDoctor(doctorId, doctorDto, imageFile);
            return ResponseEntity.ok(updateResponse);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    // Delete Doctor by ID
    @DeleteMapping("{doctorId}")
    public ResponseEntity<String> deleteDoctor(@PathVariable long doctorId) {
        return ResponseEntity.ok(doctorServices.deleteDoctorById(doctorId));
    }

    // Delete Doctor by Email
    @DeleteMapping("deleteByEmail/{email}")
    public ResponseEntity<String> deleteDoctorByEmail(@PathVariable String email) {
        try {
            return ResponseEntity.ok(doctorServices.deleteDoctorByEmail(email));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (DuplicateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

}
