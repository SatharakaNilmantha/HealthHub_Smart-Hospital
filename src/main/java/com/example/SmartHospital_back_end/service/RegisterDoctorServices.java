package com.example.SmartHospital_back_end.service;

import com.example.SmartHospital_back_end.dto.RegisterDoctorDto;

import java.util.List;

public interface RegisterDoctorServices {

    String saveDoctor(RegisterDoctorDto registerDoctorDto);

    List<RegisterDoctorDto> getAllDoctors();

    String updateDoctor(long doctorId, RegisterDoctorDto registerDoctorDto);

    String deleteDoctorById(long doctorId);

    String deleteDoctorByEmail(String email);
}
