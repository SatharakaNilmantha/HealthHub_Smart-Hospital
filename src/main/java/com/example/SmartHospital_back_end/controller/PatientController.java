package com.example.SmartHospital_back_end.controller;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.PatientDto;
import com.example.SmartHospital_back_end.service.PatientServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:1573")  // Allow requests from React
@RestController
@RequestMapping(value="api/patient")
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

}