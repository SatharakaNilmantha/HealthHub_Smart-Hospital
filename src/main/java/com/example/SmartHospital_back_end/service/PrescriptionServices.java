package com.example.SmartHospital_back_end.service;

import com.example.SmartHospital_back_end.dto.PrescriptionDto;

import java.util.List;

public interface PrescriptionServices {
    String savePrescription(PrescriptionDto prescriptionDto);

    List<PrescriptionDto> AllPrescription();

    PrescriptionDto getPrescriptionById(long prescriptionId);
}
