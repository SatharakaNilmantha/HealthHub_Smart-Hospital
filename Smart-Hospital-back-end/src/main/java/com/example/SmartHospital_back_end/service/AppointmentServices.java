package com.example.SmartHospital_back_end.service;

import com.example.SmartHospital_back_end.dto.AppointmentDto;

import java.time.LocalDateTime;
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

    List<AppointmentDto> getAppointmentsByDoctor(long doctorId);

    String updateAppointment(long appointmentId, AppointmentDto appointmentDto);
}
