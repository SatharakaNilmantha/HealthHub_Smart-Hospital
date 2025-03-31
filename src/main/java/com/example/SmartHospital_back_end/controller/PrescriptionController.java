package com.example.SmartHospital_back_end.controller;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.PrescriptionDto;
import com.example.SmartHospital_back_end.service.PrescriptionServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/Prescriptions")
@CrossOrigin(origins = "http://localhost:3000")
public class PrescriptionController {

    @Autowired
    private PrescriptionServices prescriptionServices ;


    @PostMapping("savePrescription")
    public ResponseEntity<String> savePrescription(@RequestBody PrescriptionDto prescriptionDto) {
        try {
            // Call the service method to save the admin details
            String response = prescriptionServices.savePrescription(prescriptionDto);
            return ResponseEntity.ok(response);  // Return 200 OK with success message
        } catch (DuplicateException e) {
            // If a duplicate email is found, return a 400 Bad Request with the error message
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getPrescription")
    public ResponseEntity<?> getAllPrescription() {
        try {
            List<PrescriptionDto> adminList = prescriptionServices.AllPrescription();
            return ResponseEntity.ok(adminList);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Method to get an appointment by ID
    @GetMapping("{prescriptionId}")
    public ResponseEntity<?> getPrescriptionById(@PathVariable long prescriptionId) {
        try {

            PrescriptionDto prescriptionDto = prescriptionServices.getPrescriptionById(prescriptionId);
            return ResponseEntity.ok(prescriptionDto); // Return 200 OK with appointment details
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // Return 404 if not found
        }
    }

}
