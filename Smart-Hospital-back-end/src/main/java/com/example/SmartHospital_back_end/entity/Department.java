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
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long departmentId;

    @Column(nullable = false, unique = true)
    private String name;

    @ElementCollection // Changed from String to List<String>
    private List<String> labList;

    @Column(nullable = false)
    private int noOfDoctors;

    @Column(nullable = false)
    private int noOfRooms;
}
