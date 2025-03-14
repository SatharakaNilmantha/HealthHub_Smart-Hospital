package com.example.SmartHospital_back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {

    private long employeeId;
    private String fullName;
    private String address;
    private String email;
    private String department;
    private double salary;
    private String gender; // Kept as String to allow flexibility in DTO
    private String image; // Base64 encoded string for easier transmission
    private String phoneNumber;
    private String role;
}
