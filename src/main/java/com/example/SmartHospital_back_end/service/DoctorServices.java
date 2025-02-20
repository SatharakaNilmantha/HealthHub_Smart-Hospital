package com.example.SmartHospital_back_end.service;

import com.example.SmartHospital_back_end.dto.DoctorDto;
import org.springframework.stereotype.Service;

import java.util.List;


public interface DoctorServices {

    public String savedDoctor(DoctorDto doctorDto);

    public List<DoctorDto> AllDoctor();

    public DoctorDto getDoctorById(long doctorId);

    public String updateDoctor(long doctorId, DoctorDto doctorDto);

    public String deleteDoctorById(long doctorId);

}
