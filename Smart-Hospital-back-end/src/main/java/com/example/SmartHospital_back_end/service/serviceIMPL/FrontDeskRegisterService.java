package com.example.SmartHospital_back_end.service.serviceIMPL;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.FrontDeskRegisterDto;
import com.example.SmartHospital_back_end.dto.RegisterDoctorDto;
import com.example.SmartHospital_back_end.entity.Admin;
import com.example.SmartHospital_back_end.entity.FrontDeskRegister;
import com.example.SmartHospital_back_end.entity.RegisterDoctor;
import com.example.SmartHospital_back_end.repository.FrontDeskRegisterRepository;
import com.example.SmartHospital_back_end.service.FrontDeskRegisterServices;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FrontDeskRegisterService implements FrontDeskRegisterServices {

    @Autowired
    private FrontDeskRegisterRepository frontDeskRegisterRepository;

    @Autowired
    private ModelMapper modelMapper;


    public String savedFrontDeskRegister(FrontDeskRegisterDto frontDeskRegisterDto) {
        // Check for duplicate email
        if (frontDeskRegisterRepository.existsByEmail(frontDeskRegisterDto.getEmail())) {
            throw new DuplicateException("A FrontDeskRegister with this email already exists.");
        }

        // Save the FrontDeskRegister if no duplicates found
        frontDeskRegisterRepository.save(modelMapper.map(frontDeskRegisterDto, FrontDeskRegister.class));
        return "FrontDeskRegister Details Saved Successfully";
    }

    public List<FrontDeskRegisterDto> AllFrontDeskRegisters() {
        List<FrontDeskRegister> frontDeskRegisterList = frontDeskRegisterRepository.findAll();
        if (frontDeskRegisterList.isEmpty()) {
            throw new NotFoundException("No front desk registers found in the database.");
        }
        return modelMapper.map(frontDeskRegisterList, new TypeToken<List<FrontDeskRegisterDto>>(){}.getType());
    }

    public String updateFrontDeskRegister(long frontDeskId, FrontDeskRegisterDto frontDeskRegisterDto) {
        if (frontDeskRegisterDto.getPassword() == null || frontDeskRegisterDto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password is required.");
        }

        // Check if the FrontDeskRegister exists in the repository
        Optional<FrontDeskRegister> existingFrontDeskRegister = frontDeskRegisterRepository.findById(frontDeskId);

        if (existingFrontDeskRegister.isPresent()) {
            FrontDeskRegister frontDeskRegister = existingFrontDeskRegister.get();

            // Check if the new password is the same as the old password
            if (frontDeskRegister.getPassword().equals(frontDeskRegisterDto.getPassword())) {
                throw new IllegalArgumentException("New password cannot be the same as the current password.");
            }

            // Perform the update using the repository method
            int updatedRows = frontDeskRegisterRepository.updateFrontDeskRegisterById(
                    frontDeskId,
                    frontDeskRegisterDto.getPassword()
            );

            // Check if any rows were updated
            if (updatedRows > 0) {
                return "FrontDeskRegister updated successfully with ID " + frontDeskId;
            } else {
                throw new RuntimeException("Failed to update FrontDeskRegister with ID " + frontDeskId);
            }
        } else {
            // If the FrontDeskRegister does not exist, throw an exception
            throw new RuntimeException("FrontDeskRegister not found with ID " + frontDeskId);
        }
    }

    public String deleteFrontDeskRegisterById(long frontDeskId) {
        int deletedRows = frontDeskRegisterRepository.deleteFrontDeskRegisterById(frontDeskId);

        if (deletedRows == 0) {
            // If no rows were deleted, throw custom exception
            throw new NotFoundException("FrontDeskRegister with ID " + frontDeskId + " not found or couldn't be deleted.");
        }

        return "Deleted successfully " + frontDeskId;
    }

    public String deleteFrontDeskByEmail(String email) {
        try {
            int deletedRows = frontDeskRegisterRepository.deleteFrontDeskByEmail(email);
            if (deletedRows == 0) {
                throw new NotFoundException("FrontDesk with email " + email + " not found or couldn't be deleted.");
            }
            return "Deleted successfully: " + email;
        } catch (NotFoundException e) {
            throw e;
        }
    }

    public String updateFrontDeskRegisterPassword(String email, FrontDeskRegisterDto frontDeskRegisterDto) {
        if (frontDeskRegisterDto.getPassword() == null || frontDeskRegisterDto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("New password is required.");
        }
        if (frontDeskRegisterDto.getCurrentPassword() == null || frontDeskRegisterDto.getCurrentPassword().isEmpty()) {
            throw new IllegalArgumentException("Current password is required.");
        }

        Optional<FrontDeskRegister > existingFrontDeskRegister = Optional.ofNullable(frontDeskRegisterRepository.findByEmail(email));

        if (existingFrontDeskRegister.isPresent()) {
            FrontDeskRegister frontDeskRegister = existingFrontDeskRegister.get();

            // Check if current password is correct
            if (!frontDeskRegister.getPassword().equals(frontDeskRegisterDto.getCurrentPassword())) {
                throw new IllegalArgumentException("Current password is incorrect.");
            }

            // Ensure new password is not the same as old one
            if (frontDeskRegister.getPassword().equals(frontDeskRegisterDto.getPassword())) {
                throw new IllegalArgumentException("New password cannot be the same as the current password.");
            }

            // Update the password
            int updatedRows = frontDeskRegisterRepository.updateFrontDeskRegisterPassword(email, frontDeskRegisterDto.getPassword());

            if (updatedRows > 0) {
                return "Password updated successfully";
            } else {
                throw new RuntimeException("Failed to update password.");
            }
        } else {
            throw new RuntimeException("Front desk not found with email: " + email);
        }
    }


    public String loginFrontDesk(String email, String password) {
        // Check if patient with the given email exists
        FrontDeskRegister frontDeskRegister = frontDeskRegisterRepository.findByEmail(email);
        if (frontDeskRegister == null) {
            throw new NotFoundException("No Front Desk found with this email.");
        }

        // Validate password
        if (!frontDeskRegister.getPassword().equals(password)) {
            throw new RuntimeException("Incorrect password.");
        }

        // If email and password match
        return "Login successful!";
    }
}
