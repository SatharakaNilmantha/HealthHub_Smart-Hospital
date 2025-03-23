package com.example.SmartHospital_back_end.service.serviceIMPL;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.RegisterDoctorDto;
import com.example.SmartHospital_back_end.entity.RegisterDoctor;
import com.example.SmartHospital_back_end.repository.RegisterDoctorRepository;
import com.example.SmartHospital_back_end.service.RegisterDoctorServices;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegisterDoctorService implements RegisterDoctorServices {

    @Autowired
    private RegisterDoctorRepository registerDoctorRepository;

    @Autowired
    private ModelMapper modelMapper;


    public String saveDoctor(RegisterDoctorDto registerDoctorDto) {
        // Check for duplicate email
        if (registerDoctorRepository.existsByEmail(registerDoctorDto.getEmail())) {
            throw new DuplicateException("A doctor with this email already exists.");
        }

        // Save the doctor if no duplicates found
        registerDoctorRepository.save(modelMapper.map(registerDoctorDto, RegisterDoctor.class));
        return "Doctor details saved successfully.";
    }


    public List<RegisterDoctorDto> getAllDoctors() {
        List<RegisterDoctor> doctorList = registerDoctorRepository.findAll();
        if (doctorList.isEmpty()) {
            throw new NotFoundException("No doctors found in the database.");
        }
        return modelMapper.map(doctorList, new TypeToken<List<RegisterDoctorDto>>(){}.getType());
    }


    public String updateDoctor(long doctorId, RegisterDoctorDto registerDoctorDto) {
        if (registerDoctorDto.getPassword() == null || registerDoctorDto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password is required.");
        }

        Optional<RegisterDoctor> existingDoctor = registerDoctorRepository.findById(doctorId);

        if (existingDoctor.isPresent()) {
            RegisterDoctor doctor = existingDoctor.get();

            if (doctor.getPassword().equals(registerDoctorDto.getPassword())) {
                throw new IllegalArgumentException("New password cannot be the same as the current password.");
            }

            int updatedRows = registerDoctorRepository.updateDoctorById(doctorId, registerDoctorDto.getPassword());

            if (updatedRows > 0) {
                return "Doctor updated successfully with ID " + doctorId;
            } else {
                throw new RuntimeException("Failed to update Doctor with ID " + doctorId);
            }
        } else {
            throw new RuntimeException("Doctor not found with ID " + doctorId);
        }
    }


    public String deleteDoctorById(long doctorId) {
        int deletedRows = registerDoctorRepository.deleteDoctorById(doctorId);

        if (deletedRows == 0) {
            throw new NotFoundException("Doctor with ID " + doctorId + " not found or couldn't be deleted.");
        }

        return "Doctor deleted successfully with ID " + doctorId;
    }

    public String deleteDoctorByEmail(String email) {
        try {
            int deletedRows = registerDoctorRepository.deleteDoctorByEmail(email);
            if (deletedRows == 0) {
                throw new NotFoundException("Doctor with email " + email + " not found or couldn't be deleted.");
            }
            return "Deleted successfully: " + email;
        } catch (NotFoundException e) {
            throw e;
        }
    }
}
