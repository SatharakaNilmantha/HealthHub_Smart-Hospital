package com.example.SmartHospital_back_end.service.serviceIMPL;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.AdminDto;
import com.example.SmartHospital_back_end.entity.Admin;
import com.example.SmartHospital_back_end.entity.Patient;
import com.example.SmartHospital_back_end.repository.AdminRepository;
import com.example.SmartHospital_back_end.service.AdminServices;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService implements AdminServices {

    @Autowired
    private AdminRepository adminRepository ;

    @Autowired
    private ModelMapper modelMapper;

    public  String savedAdmin (AdminDto adminDto){

        // Check for duplicate email
        if (adminRepository.existsByEmail(adminDto.getEmail())) {
            throw new DuplicateException("An Admin with this email already exists.");
        }

        // Save the patient if no duplicates found
        adminRepository.save(modelMapper.map(adminDto, Admin.class));
        return "Admin Details Saved Successfully";
    }



    public List<AdminDto> AllAdmin() {
        List adminList = adminRepository.findAll();
        if (adminList.isEmpty()) {
            throw new NotFoundException("No admins found in the database.");
        }
        return modelMapper.map(adminList, new TypeToken<List<AdminDto>>(){}.getType());
    }


    public String updateAdmin(long adminId, AdminDto adminDto) {

        if (adminDto.getPassword() == null || adminDto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password is required.");
        }

        // Check if the admin exists in the repository
        Optional<Admin> existingAdmin = adminRepository.findById(adminId);

        if (existingAdmin.isPresent()) {
            Admin admin = existingAdmin.get();

            // Check if the new password is the same as the old password
            if (admin.getPassword().equals(adminDto.getPassword())) {
                throw new IllegalArgumentException("New password cannot be the same as the current password.");
            }

            // Perform the update using the repository method
            int updatedRows = adminRepository.updateAdminById(
                    adminId,
                    adminDto.getPassword()
            );

            // Check if any rows were updated
            if (updatedRows > 0) {
                return "Admin updated successfully with ID " + adminId;
            } else {
                throw new RuntimeException("Failed to update Admin with ID " + adminId);
            }
        } else {
            // If the admin does not exist, throw an exception
            throw new RuntimeException("Admin not found with ID " + adminId);
        }
    }

    public String deleteAdminById(long adminId) {

        try {

            int deletedRows = adminRepository.deleteAdminById(adminId);

            if (deletedRows == 0) {
                // If no rows were deleted, throw custom exception
                throw new NotFoundException("Doctor with ID " + adminId + " not found or couldn't be deleted.");
            }

            return "Deleted successfully " + adminId;

        } catch (NotFoundException e) {
            throw e;
        }

    }

    public String deleteAdminByEmail(String email) {
        try {
            int deletedRows = adminRepository.deleteAdminByEmail(email);
            if (deletedRows == 0) {
                throw new NotFoundException("Admin with email " + email + " not found or couldn't be deleted.");
            }
            return "Deleted successfully: " + email;
        } catch (NotFoundException e) {
            throw e;
        }
    }

    public String loginAdmin(String email, String password) {
        // Check if patient with the given email exists
        Admin admin = adminRepository.findByEmail(email);
        if (admin == null) {
            throw new NotFoundException("No patient found with this email.");
        }

        // Validate password
        if (!admin.getPassword().equals(password)) {
            throw new RuntimeException("Incorrect password.");
        }

        // If email and password match
        return "Login successful!";
    }



}