package com.example.SmartHospital_back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FrontDeskRegisterDto {
    private Long frontDeskId;
    private String email;
    private String password;
    private String CurrentPassword;

}
