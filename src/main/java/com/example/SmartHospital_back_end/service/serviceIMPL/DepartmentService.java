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
        Department department = modelMapper.map(departmentDto, Department.class);
        departmentRepository.save(department);
        return "Department Details Saved Successfully";
    }

    public List<DepartmentDto> getAllDepartments() {
        List<Department> departmentList = departmentRepository.findAll();
        if (departmentList.isEmpty()) {
            throw new NotFoundException("No departments found in the database.");
        }
        return modelMapper.map(departmentList, new TypeToken<List<DepartmentDto>>() {}.getType());
    }

    public DepartmentDto getDepartmentById(long departmentId) {
        Department department = departmentRepository.findById(departmentId);
        if (department == null) {
            throw new NotFoundException("Employee with ID " + departmentId + " not found.");
        }
        return modelMapper.map(department, DepartmentDto.class);
    }

    public String updateDepartment(long departmentId, DepartmentDto departmentDto) {
        Optional<Department> existingDepartment = Optional.ofNullable(departmentRepository.findById(departmentId));
        if (existingDepartment.isPresent()) {
            Department department = existingDepartment.get();
            // Update department details
            department.setLabList(departmentDto.getLabList());
            department.setNoOfDoctors(departmentDto.getNoOfDoctors());
            department.setNoOfRooms(departmentDto.getNoOfRooms());

            departmentRepository.save(department); // Save updated department
            return "Department updated successfully with ID " + departmentId;
        } else {
            throw new NotFoundException("Department not found with ID " + departmentId);
        }
    }


    public String deleteDepartmentById(long departmentId) {
        if (departmentRepository.existsById(departmentId)) {
            departmentRepository.deleteById(departmentId); // Directly delete by ID
            return "Deleted successfully department with ID " + departmentId;
        } else {
            throw new NotFoundException("Department with ID " + departmentId + " not found.");
        }
    }

}
