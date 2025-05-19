package com.example.SmartHospital_back_end.service;

import com.example.SmartHospital_back_end.dto.PrescriptionDto;

import java.util.List;

public interface PrescriptionServices {
    String savePrescription(PrescriptionDto prescriptionDto);


    PrescriptionDto getPrescriptionById(long prescriptionId);

    String updatePrescription(long prescriptionId, PrescriptionDto prescriptionDto);

    String deletePrescriptionById(long prescriptionId);

    List<PrescriptionDto> getAllPrescription();
}
