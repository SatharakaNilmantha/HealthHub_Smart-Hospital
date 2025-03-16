package com.example.SmartHospital_back_end.service.serviceIMPL;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.DepartmentDto;
import com.example.SmartHospital_back_end.entity.Department;
import com.example.SmartHospital_back_end.repository.DepartmentRepository;
import com.example.SmartHospital_back_end.service.DepartmentServices;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService implements DepartmentServices {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private ModelMapper modelMapper;

    public String saveDepartment(DepartmentDto departmentDto) {
        if (departmentRepository.existsByName(departmentDto.getName())) {
            throw new DuplicateException("A Department with this name already exists.");
        }
        departmentRepository.save(modelMapper.map(departmentDto, Department.class));
        return "Department Details Saved Successfully";
    }

    public List<DepartmentDto> getAllDepartments() {
        List departmentList = departmentRepository.findAll();
        if (departmentList.isEmpty()) {
            throw new NotFoundException("No departments found in the database.");
        }
        return modelMapper.map(departmentList, new TypeToken<List<DepartmentDto>>() {}.getType());
    }

    public String updateDepartment(long departmentId, DepartmentDto departmentDto) {

        Optional<Department> existingDepartment = departmentRepository.findById(departmentId);
        if (existingDepartment.isPresent()) {
            int updatedRows = departmentRepository.updateDepartmentById(
                    departmentId,
                    departmentDto.getLabList(),
                    departmentDto.getNoOfDoctors(),
                    departmentDto.getNoOfRooms()
            );

            if (updatedRows > 0) {
                return "Department updated successfully with ID " + departmentId;
            } else {
                throw new RuntimeException("Failed to update Department with ID " + departmentId);
            }
        } else {
            throw new RuntimeException("Department not found with ID " + departmentId);
        }
    }

    public String deleteDepartmentById(long departmentId) {
        int deletedRows = departmentRepository.deleteDepartmentById(departmentId);
        if (deletedRows == 0) {
            throw new NotFoundException("Department with ID " + departmentId + " not found or couldn't be deleted.");
        }
        return "Deleted successfully " + departmentId;
    }
}
