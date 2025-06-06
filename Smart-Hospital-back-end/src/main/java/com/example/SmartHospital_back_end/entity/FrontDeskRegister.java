package com.example.SmartHospital_back_end.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class FrontDeskRegister {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long frontDeskId;

    @Column(nullable = false, unique = true)
    private String email;


    @Column(nullable = false)
    private String password;
}
