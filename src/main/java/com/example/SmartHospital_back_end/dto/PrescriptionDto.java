package com.example.SmartHospital_back_end.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrescriptionDto {

    private Long prescriptionId;
    private String patientName;
    private String contactNumber;
    private String gender;
    private int age;
    private String reasonForConsultation;
    private String medicineDetails;
    private String requiredTests;
    private String treatmentDetails;
    private Date prescriptionDate;
    private String status ;

}
