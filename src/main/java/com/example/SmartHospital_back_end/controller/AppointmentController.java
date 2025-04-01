package com.example.SmartHospital_back_end.controller;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.AdminDto;
import com.example.SmartHospital_back_end.dto.AppointmentDto;
import com.example.SmartHospital_back_end.service.AppointmentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentServices appointmentServices;

    @PostMapping("saveAppointment")
    public ResponseEntity<String> saveAppointment(@RequestBody AppointmentDto appointmentDto) {
        try {
            // Call service to save the appointment
            String response = appointmentServices.saveAppointment(appointmentDto);
            return ResponseEntity.ok(response); // Return 200 OK with success message
        } catch (DuplicateException e) {
            // Handle conflict when same doctor is booked for the same date
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @GetMapping("getAppointments")
    public ResponseEntity<?> getAllAppointments() {
        try {
            List<AppointmentDto> appointmentList = appointmentServices.getAllAppointments();
            return ResponseEntity.ok(appointmentList); // Return 200 OK with appointment list
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // Return 404 if no appointments found
        }
    }

    @GetMapping("getAppointmentsByDoctor/{doctorId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByDoctor(@PathVariable long doctorId) {
        try {
            List<AppointmentDto> appointments = appointmentServices.getAppointmentsByDoctor(doctorId);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    // Method to get an appointment by ID
    @GetMapping("{appointmentId}")
    public ResponseEntity<?> getAppointmentById(@PathVariable long appointmentId) {
        try {
            AppointmentDto appointmentDto = appointmentServices.getAppointmentById(appointmentId);
            return ResponseEntity.ok(appointmentDto); // Return 200 OK with appointment details
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // Return 404 if not found
        }
    }

    @PutMapping("{appointmentId}")
    public ResponseEntity<?> updateAppointment(@PathVariable long appointmentId, @RequestBody AppointmentDto appointmentDto) {
        try {
            String updateResponse = appointmentServices.updateAppointment(appointmentId ,appointmentDto);
            return new ResponseEntity<>(updateResponse, HttpStatus.OK); // Changed status to OK
        } catch (RuntimeException e) {
            // If the admin is not found, return a 404 Not Found status
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // For any unexpected errors, return a 500 Internal Server Error
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Method to delete an appointment by ID
    @DeleteMapping("{appointmentId}")
    public ResponseEntity<String> deleteAppointmentById(@PathVariable long appointmentId) {
        try {
            String response = appointmentServices.deleteAppointmentById(appointmentId);
            return ResponseEntity.ok(response); // Return 200 OK with success message
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // Return 404 if not found
        }
    }


}
