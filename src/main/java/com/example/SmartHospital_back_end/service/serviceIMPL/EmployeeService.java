package com.example.SmartHospital_back_end.service.serviceIMPL;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.EmployeeDto;
import com.example.SmartHospital_back_end.entity.Employee;
import com.example.SmartHospital_back_end.repository.EmployeeRepository;
import com.example.SmartHospital_back_end.service.EmployeeServices;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService implements EmployeeServices {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ModelMapper modelMapper;

    public String savedEmployee(EmployeeDto employeeDto) {
        boolean exists = employeeRepository.existsByFullNameAndPhoneNumberAndDepartmentAndRole(
                employeeDto.getFullName(),
                employeeDto.getPhoneNumber(),
                employeeDto.getDepartment(),
                employeeDto.getRole()
        );

        if (exists) {
            return "Employee with the same details already exists.";
        }
        if (employeeRepository.existsByEmail(employeeDto.getEmail())) {
            throw new DuplicateException("An Employee with this email already exists.");
        }

        employeeRepository.save(modelMapper.map(employeeDto, Employee.class));
        return "Employee saved successfully";
    }

    public List<EmployeeDto> AllEmployee() {
        List<Employee> employeeList = employeeRepository.findAll();
        if (employeeList.isEmpty()) {
            throw new NotFoundException("No Employee found in the database.");
        }
        return modelMapper.map(employeeList, new TypeToken<List<EmployeeDto>>() {}.getType());
    }

    public EmployeeDto getEmployeeById(long employeeId) {
        Employee employee = employeeRepository.findById(employeeId);
        if (employee == null) {
            throw new NotFoundException("Employee with ID " + employeeId + " not found.");
        }
        return modelMapper.map(employee, EmployeeDto.class);
    }

    public String updateEmployee(long employeeId, EmployeeDto employeeDto) {
        if (!employeeRepository.existsById(employeeId)) {
            throw new NotFoundException("Employee not found with ID " + employeeId);
        }

        int updatedRows = employeeRepository.updateEmployeeById(
                employeeId,
                employeeDto.getFullName(),
                employeeDto.getAddress(),
                employeeDto.getGender(),
                employeeDto.getImage(),
                employeeDto.getPhoneNumber(),
                employeeDto.getDepartment(),
                employeeDto.getRole()
        );

        if (updatedRows > 0) {
            return "Employee updated successfully with ID " + employeeId;
        } else {
            throw new RuntimeException("Failed to update Employee with ID " + employeeId);
        }
    }

    public String deleteEmployeeById(long employeeId) {
        int deletedRows = employeeRepository.deleteEmployeeById(employeeId);
        if (deletedRows == 0) {
            throw new NotFoundException("Employee with ID " + employeeId + " not found.");
        }
        return "Deleted successfully " + employeeId;
    }
}
