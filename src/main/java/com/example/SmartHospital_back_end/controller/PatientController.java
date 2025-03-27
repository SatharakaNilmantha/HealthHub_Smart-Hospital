package com.example.SmartHospital_back_end.controller;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.AdminDto;
import com.example.SmartHospital_back_end.dto.PatientDto;
import com.example.SmartHospital_back_end.service.PatientServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patient")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    @Autowired
    private PatientServices patientServices;


    @PostMapping("savePatient")
    public ResponseEntity<String> savePatient(@RequestBody PatientDto patientDto) {
        try {
            String response = patientServices.patientSaved(patientDto);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (DuplicateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getPatient")
    public ResponseEntity<List<PatientDto>> getAllPatient() {

        List<PatientDto> patientlist = patientServices.AllPatient();
        return ResponseEntity.ok(patientlist);
    }


    @GetMapping("{patientId}")
    public ResponseEntity<?> getPatientById(@PathVariable long patientId) {

        try {
            PatientDto patientFromId = patientServices.getPatientById(patientId);
            return new ResponseEntity<>(patientFromId, HttpStatus.CREATED);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("{patientId}")
    public ResponseEntity<?> updatePatient(@PathVariable long patientId, @RequestBody PatientDto patientDto) {
        try {
            String updateResponse = patientServices.updatePatient(patientId, patientDto);
            return new ResponseEntity<>(updateResponse, HttpStatus.OK); // Changed status to OK
        } catch (RuntimeException e) {
            // If the patient is not found, return a 404 Not Found status
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // For any unexpected errors, return a 500 Internal Server Error
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("changePassword/{patientId}")
    public ResponseEntity<?> updatePatientPassword(@PathVariable long patientId, @RequestBody PatientDto patientDto) {
        try {
            String updateResponse = patientServices.updatePatientPassword(patientId, patientDto);
            return new ResponseEntity<>(updateResponse, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginPatient(@RequestParam String email, @RequestParam String password) {
        PatientDto patientDto = patientServices.loginPatient(email, password);

        // Return the patient details (id and email) as part of the response
        return ResponseEntity.status(HttpStatus.OK).body(new LoginResponse(patientDto.getPatientId(), patientDto.getEmail(), "Login successful!"));
    }

    // DTO for the login response
    public static class LoginResponse {
        private long patientId;
        private String email;
        private String message;

        public LoginResponse(long patientId, String email, String message) {
            this.patientId = patientId;
            this.email = email;
            this.message = message;
        }

        public long getPatientId() {
            return patientId;
        }

        public void setPatientId(long patientId) {
            this.patientId = patientId;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}