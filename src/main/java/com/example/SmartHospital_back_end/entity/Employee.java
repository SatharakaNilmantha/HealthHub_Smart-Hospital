package com.example.SmartHospital_back_end.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long employeeId;

    private String imagePath;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private double salary;

    @Column(nullable = false)
    private String shiftStartTime;

    @Column(nullable = false)
    private String shiftEndTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    // Enum for Gender
    public enum Gender {
        Male, Female, Other
    }

}
