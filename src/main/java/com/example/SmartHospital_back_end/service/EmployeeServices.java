package com.example.SmartHospital_back_end.service;

import com.example.SmartHospital_back_end.dto.EmployeeDto;

import java.util.List;

public interface EmployeeServices {
    String savedEmployee(EmployeeDto employeeDto);

    List<EmployeeDto> AllEmployee();

    String updateEmployee(long employeeId, EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(long employeeId);

    String deleteEmployeeById(long employeeId);
}
