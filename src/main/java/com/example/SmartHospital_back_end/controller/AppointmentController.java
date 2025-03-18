package com.example.SmartHospital_back_end.controller;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
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

    // Method to save a new appointment
    @PostMapping("saveAppointment")
    public ResponseEntity<String> saveAppointment(@RequestBody AppointmentDto appointmentDto) {
        try {
            // Check if an appointment already exists for the same doctor on the same date
            String response = appointmentServices.saveAppointment(appointmentDto);
            return ResponseEntity.ok(response); // Return 200 OK with success message
        } catch (DuplicateException e) {
            // Handle conflict when same doctor is booked for the same date
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body( e.getMessage());
        }
    }

    // Method to get all appointments
    @GetMapping("getAppointments")
    public ResponseEntity<?> getAllAppointments() {
        try {
            List<AppointmentDto> appointmentList = appointmentServices.getAllAppointments();
            return ResponseEntity.ok(appointmentList); // Return 200 OK with appointment list
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // Return 404 if no appointments found
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
