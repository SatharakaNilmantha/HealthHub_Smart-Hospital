package com.example.SmartHospital_back_end.service;

import com.example.SmartHospital_back_end.dto.PatientDto;

import java.util.List;

public interface PatientServices {
    public String patientSaved(PatientDto patientDto);
    public List<PatientDto> AllPatient();
    public PatientDto getPatientById(long patientId);
    public String updatePatient(long patientId, PatientDto patientDto);
}
