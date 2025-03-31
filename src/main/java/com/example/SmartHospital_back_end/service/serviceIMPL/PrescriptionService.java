package com.example.SmartHospital_back_end.service.serviceIMPL;


import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.PrescriptionDto;
import com.example.SmartHospital_back_end.entity.Prescription;
import com.example.SmartHospital_back_end.repository.PrescriptionRepository;
import com.example.SmartHospital_back_end.service.PrescriptionServices;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionService implements PrescriptionServices {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PrescriptionRepository prescriptionRepository;


    public  String savePrescription (PrescriptionDto prescriptionDto){
        // Save the prescription
        prescriptionRepository.save(modelMapper.map(prescriptionDto, Prescription.class));
        return "Admin Details Saved Successfully";
    }


    public List<PrescriptionDto> AllPrescription() {
        List prescriptionsList = prescriptionRepository.findAll();
        if (prescriptionsList.isEmpty()) {
            throw new NotFoundException("No admins found in the database.");
        }
        return modelMapper.map(prescriptionsList, new TypeToken<List<PrescriptionDto>>(){}.getType());
    }

    public PrescriptionDto getPrescriptionById(long prescriptionId) {
        try {
            Prescription prescription = prescriptionRepository.getPrescriptionById(prescriptionId);
            return  modelMapper.map(prescription , PrescriptionDto.class);
        }catch (Exception e){
            throw  new NotFoundException("Patient with ID " + prescriptionId + " not found or couldn't be getten.");
        }
    }



}
