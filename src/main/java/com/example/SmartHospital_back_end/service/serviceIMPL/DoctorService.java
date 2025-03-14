package com.example.SmartHospital_back_end.service.serviceIMPL;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.DoctorDto;
import com.example.SmartHospital_back_end.entity.Doctor;
import com.example.SmartHospital_back_end.repository.DoctorRepository;
import com.example.SmartHospital_back_end.service.DoctorServices;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService implements DoctorServices {

    @Autowired
    private ModelMapper modelMapper ;
    @Autowired
    private DoctorRepository doctorRepository ;

    public String savedDoctor(DoctorDto doctorDto){
        // Check if doctor with the same full_name, phone_number, department, and title already exists
        boolean exists = doctorRepository.existsByFullNameAndPhoneNumberAndDepartmentAndTitle(
                doctorDto.getFullName(),
                doctorDto.getPhoneNumber(),
                doctorDto.getDepartment(),
                doctorDto.getTitle()
        );

        if (exists) {
            return "Doctor with the same details already exists.";
        }
        if (doctorRepository.existsByEmail(doctorDto.getEmail())) {
            throw new DuplicateException("An Doctor with this email already exists.");
        }


        // Save the doctor if not already exists
        doctorRepository.save(modelMapper.map(doctorDto, Doctor.class));
        return "Doctor saved successfully  ";
    }


    public List<DoctorDto> AllDoctor(){
        List doctorList = doctorRepository.findAll();
        if (doctorList.isEmpty()) {
            throw new NotFoundException("No Doctors found in the database.");
        }
        return modelMapper.map(doctorList , new TypeToken<List<DoctorDto>>(){}.getType());
    }


    public DoctorDto getDoctorById(long doctorId){

        try {
            Doctor doctor = doctorRepository.getDoctorById(doctorId);
            return  modelMapper.map(doctor, DoctorDto.class);
        }catch (Exception e){
            throw  new NotFoundException("Doctor with ID " + doctorId + " not found or couldn't be getten.");
        }
    }


    public String updateDoctor(long doctorId, DoctorDto doctorDto) {
        // Validate that the DoctorDto and all required fields are not null or empty
        if (doctorDto == null) {
            throw new IllegalArgumentException("Doctor details cannot be null.");
        }
        if (doctorDto.getFullName() == null || doctorDto.getFullName().trim().isEmpty()) {
            throw new IllegalArgumentException("Full name is required.");
        }
        if (doctorDto.getAddress() == null || doctorDto.getAddress().trim().isEmpty()) {
            throw new IllegalArgumentException("Address is required.");
        }
        if (doctorDto.getGender() == null || doctorDto.getGender().trim().isEmpty()) {
            throw new IllegalArgumentException("Gender is required.");
        }
        if (doctorDto.getPhoneNumber() == null || doctorDto.getPhoneNumber().trim().isEmpty()) {
            throw new IllegalArgumentException("Phone number is required.");
        }
        if (doctorDto.getDegree() == null || doctorDto.getDegree().trim().isEmpty()) {
            throw new IllegalArgumentException("Degree is required.");
        }
        if (doctorDto.getDepartment() == null || doctorDto.getDepartment().trim().isEmpty()) {
            throw new IllegalArgumentException("Department is required.");
        }
        if (doctorDto.getTitle() == null || doctorDto.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Title is required.");
        }
        if (doctorDto.getDescription() == null || doctorDto.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("Description is required.");
        }


        // Check if the doctor exists in the repository
        if (!doctorRepository.existsById(doctorId)) {
            throw new RuntimeException("Doctor not found with ID " + doctorId);
        }

        // Perform the update using the repository method
        int updatedRows = doctorRepository.updateDoctorById(
                doctorId,
                doctorDto.getFullName(),
                doctorDto.getAddress(),
                doctorDto.getGender(),
                doctorDto.getImage(),
                doctorDto.getPhoneNumber(),
                doctorDto.getDegree(),
                doctorDto.getDepartment(),
                doctorDto.getTitle(),
                doctorDto.getDescription(),
                doctorDto.getFees()
        );

        // Check if any rows were updated
        if (updatedRows > 0) {
            return "Doctor updated successfully with ID " + doctorId;
        } else {
            throw new RuntimeException("Failed to update doctor with ID " + doctorId);
        }
    }



    public String deleteDoctorById(long doctorId) {

        try {
            // Assuming `bookRepository.deleteBookByIdBook(bookId)` returns the number of affected rows
            int deletedRows = doctorRepository.deleteDoctorById(doctorId);

            if (deletedRows == 0) {
                // If no rows were deleted, throw custom exception
                throw new NotFoundException("Doctor with ID " + doctorId + " not found or couldn't be deleted.");
            }

            return "Deleted successfully " + doctorId;

        } catch (NotFoundException e) {
            throw e;
        }

    }




}
