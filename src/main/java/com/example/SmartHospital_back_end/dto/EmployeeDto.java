package com.example.SmartHospital_back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

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
    private String gender;
    private String phoneNumber;
    private String role;
    private String shiftStartTime;
    private String shiftEndTime;
    private String imagePath;

}
