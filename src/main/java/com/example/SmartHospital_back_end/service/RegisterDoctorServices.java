package com.example.SmartHospital_back_end.service;

import com.example.SmartHospital_back_end.dto.RegisterDoctorDto;

import java.util.List;

public interface RegisterDoctorServices {

    String saveDoctor(RegisterDoctorDto registerDoctorDto);

    List<RegisterDoctorDto> getAllDoctors();


    String deleteDoctorById(long doctorId);

    String deleteDoctorByEmail(String email);

    String loginRegisterDoctor(String email, String password);


    String updateDoctorPassword(String email, RegisterDoctorDto registerDoctorDto);
}
