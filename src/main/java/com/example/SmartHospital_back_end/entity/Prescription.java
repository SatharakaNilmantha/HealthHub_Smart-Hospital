package com.example.SmartHospital_back_end.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long prescriptionId;

    @Column(nullable = false)
    private String patientName;

    @Column(nullable = false)
    private String contactNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Doctor.Gender gender;


    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private String reasonForConsultation;

    @Column(nullable = false)
    private String medicineDetails;

    @Column(nullable = false)
    private String requiredTests;

    @Column(nullable = false)
    private String treatmentDetails;

    @Column(nullable = false)
    private Date prescriptionDate;

    @Column(nullable = false)
    private String status ;


    public enum Gender {
        Male, Female, Other
    }

}
