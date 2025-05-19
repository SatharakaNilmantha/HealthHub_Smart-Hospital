package com.example.SmartHospital_back_end.controller;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.FrontDeskRegisterDto;
import com.example.SmartHospital_back_end.dto.RegisterDoctorDto;
import com.example.SmartHospital_back_end.service.FrontDeskRegisterServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/frontDeskRegisters")
public class FrontDeskRegisterController {

    @Autowired
    private FrontDeskRegisterServices frontDeskRegisterServices;

    @PostMapping("saveFrontDeskRegister")
    public ResponseEntity<String> saveFrontDeskRegister(@RequestBody FrontDeskRegisterDto frontDeskRegisterDto) {
        try {
            String response = frontDeskRegisterServices.savedFrontDeskRegister(frontDeskRegisterDto);
            return ResponseEntity.ok(response);  // Return 200 OK with success message
        } catch (DuplicateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getFrontDeskRegisters")
    public ResponseEntity<?> getAllFrontDeskRegisters() {
        try {
            List<FrontDeskRegisterDto> frontDeskRegisterList = frontDeskRegisterServices.AllFrontDeskRegisters();
            return ResponseEntity.ok(frontDeskRegisterList);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("changePassword/{email}")
    public ResponseEntity<?> updateFrontDeskRegisterPassword(@PathVariable String email, @RequestBody FrontDeskRegisterDto frontDeskRegisterDto) {
        try {
            String updateResponse = frontDeskRegisterServices.updateFrontDeskRegisterPassword(email, frontDeskRegisterDto);
            return new ResponseEntity<>(updateResponse, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("{frontDeskId}")
    public ResponseEntity<String> deleteFrontDeskRegisterById(@PathVariable long frontDeskId) {
        try {
            String confirmResponse = frontDeskRegisterServices.deleteFrontDeskRegisterById(frontDeskId);
            return ResponseEntity.ok(confirmResponse);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @DeleteMapping("deleteByEmail/{email}")
    public ResponseEntity<String> deleteFrontDeskByEmail(@PathVariable String email) {
        try {
            String confirmResponse = frontDeskRegisterServices.deleteFrontDeskByEmail(email);
            return ResponseEntity.ok(confirmResponse);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginFrontDesk(@RequestBody FrontDeskRegisterController.LoginRequest loginRequest) {
        String loginMessage = frontDeskRegisterServices.loginFrontDesk(loginRequest.getEmail(), loginRequest.getPassword());

        // Return the login message as JSON
        return ResponseEntity.status(HttpStatus.OK).body(new FrontDeskRegisterController.MessageResponse(loginMessage));
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

    // DTO for the response message
    public static class MessageResponse {
        private String message;

        public MessageResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }


}
