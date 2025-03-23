package com.example.SmartHospital_back_end.service;

import com.example.SmartHospital_back_end.dto.EmployeeDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface EmployeeServices {

    String saveEmployee(EmployeeDto employeeDto, MultipartFile image) throws IOException;

    List<EmployeeDto> getAllEmployees();

    EmployeeDto getEmployeeById(long employeeId);

    String updateEmployee(long employeeId, EmployeeDto employeeDto, MultipartFile image) throws IOException;

    String deleteEmployeeById(long employeeId);
}
