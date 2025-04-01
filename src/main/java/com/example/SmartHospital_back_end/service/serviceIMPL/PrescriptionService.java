package com.example.SmartHospital_back_end.service.serviceIMPL;


import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.AppointmentDto;
import com.example.SmartHospital_back_end.dto.PrescriptionDto;
import com.example.SmartHospital_back_end.entity.Appointment;
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


    public List<PrescriptionDto> getAllPrescription() {
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

    public String updatePrescription(long prescriptionId, PrescriptionDto prescriptionDto) {
        if (prescriptionRepository.existsById(prescriptionId)) {
            // Perform the update using the repository method
            int updatedRows = prescriptionRepository.updatePrescription(
                    prescriptionId,
                    prescriptionDto.getStatus()
            );
            // Check if any rows were updated
            if (updatedRows > 0) {
                return "Patient's Prescription successfully with ID " + prescriptionId;
            } else {
                throw new RuntimeException("Failed to update Patient's Prescription  with ID " + prescriptionId);
            }
        } else {
            // If the patient does not exist, throw an exception
            throw new RuntimeException("Patient's Appointment  not found with ID " + prescriptionId);
        }
    }

    public String deletePrescriptionById(long prescriptionId) {
        // Check if appointment exists

        Prescription prescription = prescriptionRepository.findById(prescriptionId).orElseThrow(() -> new NotFoundException("Appointment not found"));

        // Delete appointment
        prescriptionRepository.delete(prescription);
        return "Appointment deleted successfully";
    }



}
