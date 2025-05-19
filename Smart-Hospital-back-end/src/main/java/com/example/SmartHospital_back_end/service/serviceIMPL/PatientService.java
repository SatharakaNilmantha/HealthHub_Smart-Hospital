package com.example.SmartHospital_back_end.service.serviceIMPL;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.AdminDto;
import com.example.SmartHospital_back_end.dto.PatientDto;
import com.example.SmartHospital_back_end.entity.Admin;
import com.example.SmartHospital_back_end.entity.Patient;
import com.example.SmartHospital_back_end.repository.PatientRepository;
import com.example.SmartHospital_back_end.service.PatientServices;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService implements PatientServices {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ModelMapper modelMapper;



    public String patientSaved(PatientDto patientDto) {
        // Check for duplicate email
        if (patientRepository.existsByEmail(patientDto.getEmail())) {
            throw new DuplicateException("A patient with this email already exists.");
        }


        // Save the patient if no duplicates found
        patientRepository.save(modelMapper.map(patientDto, Patient.class));
        return "Patient Details Saved Successfully";
    }


    public List<PatientDto> AllPatient(){

        List patientList = patientRepository.findAll();
        return modelMapper.map(patientList , new TypeToken<List<PatientDto>>(){}.getType());
    }



    public PatientDto getPatientById(long patientId){

        try {
            Patient patient = patientRepository.getPatientById(patientId);
            return  modelMapper.map(patient ,PatientDto.class);
        }catch (Exception e){
            throw  new NotFoundException("Patient with ID " + patientId + " not found or couldn't be getten.");
        }
    }


    public String updatePatient(long patientId, PatientDto patientDto) {
        // Validate that the PatientDto and all required fields are not null or empty
        if (patientDto == null) {
            throw new IllegalArgumentException("Patient details cannot be null.");
        }
        if (patientDto.getFullName() == null || patientDto.getFullName().isEmpty()) {
            throw new IllegalArgumentException("Full name is required.");
        }
        if (patientDto.getAddress() == null || patientDto.getAddress().isEmpty()) {
            throw new IllegalArgumentException("Address is required.");
        }
        if (patientDto.getGender() == null || patientDto.getGender().isEmpty()) {
            throw new IllegalArgumentException("Gender is required.");
        }

        if (patientDto.getPhoneNumber() == null || patientDto.getPhoneNumber().isEmpty()) {
            throw new IllegalArgumentException("Phone number is required.");
        }
        if (patientDto.getDob() == null) {
            throw new IllegalArgumentException("Date of birth is required.");
        }

        // Check if the patient exists in the repository
        if (patientRepository.existsById(patientId)) {
            // Perform the update using the repository method
            int updatedRows = patientRepository.updatePatientById(
                    patientId,
                    patientDto.getFullName(),
                    patientDto.getAddress(),
                    patientDto.getGender(),
                    patientDto.getPhoneNumber(),
                    patientDto.getDob()
            );

            // Check if any rows were updated
            if (updatedRows > 0) {
                return "Patient updated successfully with ID " + patientId;
            } else {
                throw new RuntimeException("Failed to update patient with ID " + patientId);
            }
        } else {
            // If the patient does not exist, throw an exception
            throw new RuntimeException("Patient not found with ID " + patientId);
        }
    }


    public String updatePatientPassword(long patientId, PatientDto patientDto) {
        if (patientDto.getPassword() == null || patientDto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("New password is required.");
        }
        if (patientDto.getCurrentPassword() == null || patientDto.getCurrentPassword().isEmpty()) {
            throw new IllegalArgumentException("Current password is required.");
        }

        // Fetch patient from repository
        Optional<Patient> existingPatient = patientRepository.findById(patientId);

        if (existingPatient.isPresent()) {
            Patient patient = existingPatient.get();

            // Check if the provided current password matches the stored password
            if (!patient.getPassword().equals(patientDto.getCurrentPassword())) {
                throw new IllegalArgumentException("Current password is incorrect.");
            }

            // Ensure the new password is not the same as the old one
            if (patient.getPassword().equals(patientDto.getPassword())) {
                throw new IllegalArgumentException("New password cannot be the same as the current password.");
            }

            // Update the password
            int updatedRows = patientRepository.updatePatientPassword(patientId, patientDto.getPassword());

            if (updatedRows > 0) {
                return "Password updated successfully " ;
            } else {
                throw new RuntimeException("Failed to update password for Patient ID " + patientId);
            }
        } else {
            throw new RuntimeException("Patient not found with ID " + patientId);
        }
    }


    public PatientDto loginPatient(String email, String password) {
        // Check if patient with the given email exists
        Patient patient = patientRepository.findByEmail(email);
        if (patient == null) {
            throw new NotFoundException("No patient found with this email.");
        }

        // Validate password
        if (!patient.getPassword().equals(password)) {
            throw new RuntimeException("Incorrect password.");
        }

        // Map patient entity to DTO to return patient details
        return modelMapper.map(patient, PatientDto.class);
    }

}
