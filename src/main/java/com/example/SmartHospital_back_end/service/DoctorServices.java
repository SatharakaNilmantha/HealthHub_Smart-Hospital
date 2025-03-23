package com.example.SmartHospital_back_end.service;

import com.example.SmartHospital_back_end.dto.DoctorDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DoctorServices {

    String saveDoctor(DoctorDto doctorDto, MultipartFile image) throws IOException;

    List<DoctorDto> getAllDoctors();

    DoctorDto getDoctorById(long doctorId);

    String updateDoctor(long doctorId, DoctorDto doctorDto, MultipartFile image) throws IOException;

    String deleteDoctorById(long doctorId);

    String deleteDoctorByEmail(String email);
}
