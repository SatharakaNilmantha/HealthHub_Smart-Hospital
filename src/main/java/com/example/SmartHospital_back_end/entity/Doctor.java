package com.example.SmartHospital_back_end.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long doctorId;

    @Lob
    private byte[] image; // To store images as byte array

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phoneNumber;

    private String address;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String degree;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private double fees;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    // Enum for Gender
    public enum Gender {
        Male, Female, Other
    }
}
