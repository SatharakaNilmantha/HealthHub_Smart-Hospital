package com.example.SmartHospital_back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDoctorDto {
    private Long doctorId;
    private String email;
    private String password;
    private String CurrentPassword;
}
