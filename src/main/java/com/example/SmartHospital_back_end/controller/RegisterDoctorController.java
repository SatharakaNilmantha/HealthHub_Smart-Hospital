package com.example.SmartHospital_back_end.controller;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.AdminDto;
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

    @PutMapping("changePassword/{email}")
    public ResponseEntity<?> updateDoctorPassword(@PathVariable String email, @RequestBody RegisterDoctorDto registerDoctorDto) {
        try {
            String updateResponse = registerDoctorServices.updateDoctorPassword(email, registerDoctorDto);
            return new ResponseEntity<>(updateResponse, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
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

    @DeleteMapping("deleteByEmail/{email}")
    public ResponseEntity<String> deleteDoctorByEmail(@PathVariable String email) {
        try {
            String confirmResponse = registerDoctorServices.deleteDoctorByEmail(email);
            return ResponseEntity.ok(confirmResponse);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }



    @PostMapping("/login")
    public ResponseEntity<Object> loginRegisterDoctor(@RequestBody AdminController.LoginRequest loginRequest) {
        String loginMessage = registerDoctorServices.loginRegisterDoctor(loginRequest.getEmail(), loginRequest.getPassword());

        // Return the login message as JSON
        return ResponseEntity.status(HttpStatus.OK).body(new AdminController.MessageResponse(loginMessage));
    }

    // DTO for the login request
    public static class LoginRequest {
        private String email;
        private String password;

        // Getters and setters
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
