package com.example.SmartHospital_back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDto {

    private long appointmentId;
    private long patientId;
    private long doctorId;
    private LocalDateTime appointmentDateTime;
    private String type ;
    private String state ;
}
