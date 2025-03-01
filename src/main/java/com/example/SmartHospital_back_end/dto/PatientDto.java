package com.example.SmartHospital_back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDto {

    private long patientId;
    private String fullName;
    private String phoneNumber;
    private String address;
    private String gender; // Use String to simplify gender representation in the DTO
    private LocalDate dob;
    private int age;
    private String email;
    private String password;
}
