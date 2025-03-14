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


}