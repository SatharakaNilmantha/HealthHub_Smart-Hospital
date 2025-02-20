package com.example.SmartHospital_back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto {
    private long doctorId;
    private String address;
    private String degree;
    private String department;
    private String description;
    private double fees;
    private String fullName;
    private String gender; // Kept as String to allow flexibility in DTO
    private String image; // Base64 encoded string for easier transmission
    private String phoneNumber;
    private String title;
}