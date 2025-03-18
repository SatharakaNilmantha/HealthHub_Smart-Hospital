package com.example.SmartHospital_back_end.service.serviceIMPL;

import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.AppointmentDto;
import com.example.SmartHospital_back_end.entity.Appointment;
import com.example.SmartHospital_back_end.entity.Doctor;
import com.example.SmartHospital_back_end.entity.Patient;
import com.example.SmartHospital_back_end.repository.AppointmentRepository;
import com.example.SmartHospital_back_end.repository.DoctorRepository;
import com.example.SmartHospital_back_end.repository.PatientRepository;
import com.example.SmartHospital_back_end.service.AppointmentServices;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService implements AppointmentServices {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String saveAppointment(AppointmentDto appointmentDto) {
        long patientId = appointmentDto.getPatientId();
        long doctorId = appointmentDto.getDoctorId();
        LocalDateTime appointmentDate = appointmentDto.getAppointmentDate();

        // Check if the patient already has an appointment with this doctor on the same date
        if (appointmentRepository.existsByPatient_PatientIdAndDoctor_DoctorIdAndAppointmentDate(patientId, doctorId, appointmentDate)) {
            throw new RuntimeException("You already have an appointment with this doctor on the selected date.");
        }

        // Check if doctor exists
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(() -> new NotFoundException("Doctor not found"));

        // Check if patient exists
        Patient patient = patientRepository.findById(patientId).orElseThrow(() -> new NotFoundException("Patient not found"));

        // Save the new appointment
        Appointment appointment = modelMapper.map(appointmentDto, Appointment.class);
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointmentRepository.save(appointment);
        return "Appointment booked successfully";
    }


    public List<AppointmentDto> getAllAppointments() {
        // Fetch all appointments and return them
        List<Appointment> appointments = appointmentRepository.findAll();
        return modelMapper.map(appointments, new TypeToken<List<AppointmentDto>>() {}.getType());
    }

    @Override
    public AppointmentDto getAppointmentById(long appointmentId) {
        // Fetch appointment by ID
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(() -> new NotFoundException("Appointment not found"));
        return modelMapper.map(appointment, AppointmentDto.class);
    }


    public String deleteAppointmentById(long appointmentId) {
        // Check if appointment exists
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(() -> new NotFoundException("Appointment not found"));

        // Delete appointment
        appointmentRepository.delete(appointment);
        return "Appointment deleted successfully";
    }
}
