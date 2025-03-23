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
    private String email;
    private String degree;
    private String department;
    private String description;
    private double fees;
    private String fullName;
    private String gender;
    private String imageUrl; // URL for the image stored on OneDrive
    private String phoneNumber;
    private String title;
}
