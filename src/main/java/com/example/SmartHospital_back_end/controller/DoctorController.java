package com.example.SmartHospital_back_end.controller;


import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.DoctorDto;
import com.example.SmartHospital_back_end.service.DoctorServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/doctors")
public class DoctorController {
    @Autowired
    private DoctorServices doctorServices ;

    @PostMapping("saveDoctor")
    public ResponseEntity<String> saveDoctor (@RequestBody DoctorDto doctorDto){
        try {
            // Call the service method to save the admin details
            String response = doctorServices.savedDoctor(doctorDto);
            return ResponseEntity.ok(response);  // Return 200 OK with success message
        } catch (DuplicateException e) {
            // If a duplicate email is found, return a 400 Bad Request with the error message
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("getDoctor")
    public ResponseEntity<?> getAllDoctor() {

        try {
            List<DoctorDto> doctorlist = doctorServices.AllDoctor();
            return ResponseEntity.ok(doctorlist);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("{doctorId}")
    public ResponseEntity<?> getDoctorById(@PathVariable long doctorId){

        try {
            DoctorDto doctorFromId = doctorServices.getDoctorById(doctorId);
            return new ResponseEntity<>(doctorFromId, HttpStatus.CREATED);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("{doctorId}")
    public ResponseEntity<?> updateDoctor(@PathVariable long doctorId, @RequestBody DoctorDto doctorDto) {
        try {
            String updateResponse = doctorServices.updateDoctor(doctorId ,doctorDto);
            return new ResponseEntity<>(updateResponse, HttpStatus.OK); // Changed status to OK
        } catch (RuntimeException e) {
            // If the patient is not found, return a 404 Not Found status
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // For any unexpected errors, return a 500 Internal Server Error
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("{doctorId}")
    public ResponseEntity<String> deleteDoctorById(@PathVariable long doctorId)
    {

        try {

            String confirmResponse = doctorServices.deleteDoctorById(doctorId);
            return ResponseEntity.ok(confirmResponse);
        } catch (NotFoundException e) {
            // Handle NotFoundException and return HTTP 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // Handle any other exceptions and return HTTP 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }

    }



}
