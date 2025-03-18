package com.example.SmartHospital_back_end.service;

import com.example.SmartHospital_back_end.dto.AppointmentDto;

import java.util.List;

public interface AppointmentServices {

    // Method to save a new appointment
    String saveAppointment(AppointmentDto appointmentDto);

    // Method to get a list of all appointments
    List<AppointmentDto> getAllAppointments();

    // Method to get an appointment by its ID
    AppointmentDto getAppointmentById(long appointmentId);

    // Method to delete an appointment by its ID

    String deleteAppointmentById(long appointmentId);
}
