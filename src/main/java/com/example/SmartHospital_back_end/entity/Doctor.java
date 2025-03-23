package com.example.SmartHospital_back_end.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long doctorId;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phoneNumber;

    private String address;

    @Column(nullable = false, unique = true)
    private String email;

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

    private String imageUrl; // Store the OneDrive image URL

    public enum Gender {
        Male, Female, Other
    }

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Appointment> appointments; // This sets up the cascading delete for appointments
}
