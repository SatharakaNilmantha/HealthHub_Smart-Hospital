package com.example.SmartHospital_back_end.service.serviceIMPL;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.AdminDto;
import com.example.SmartHospital_back_end.entity.Admin;
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


    public String updateAdminPassword(String email, AdminDto adminDto) {
        if (adminDto.getPassword() == null || adminDto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("New password is required.");
        }
        if (adminDto.getCurrentPassword() == null || adminDto.getCurrentPassword().isEmpty()) {
            throw new IllegalArgumentException("Current password is required.");
        }

        Optional<Admin> existingAdmin = Optional.ofNullable(adminRepository.findByEmail(email));

        if (existingAdmin.isPresent()) {
            Admin admin = existingAdmin.get();

            // Check if current password is correct
            if (!admin.getPassword().equals(adminDto.getCurrentPassword())) {
                throw new IllegalArgumentException("Current password is incorrect.");
            }

            // Ensure new password is not the same as old one
            if (admin.getPassword().equals(adminDto.getPassword())) {
                throw new IllegalArgumentException("New password cannot be the same as the current password.");
            }

            // Update the password
            int updatedRows = adminRepository.updateAdminPassword(email, adminDto.getPassword());

            if (updatedRows > 0) {
                return "Password updated successfully";
            } else {
                throw new RuntimeException("Failed to update password.");
            }
        } else {
            throw new RuntimeException("Admin not found with email: " + email);
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