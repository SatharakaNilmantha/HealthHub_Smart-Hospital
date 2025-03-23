package com.example.SmartHospital_back_end.service.serviceIMPL;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.DoctorDto;
import com.example.SmartHospital_back_end.entity.Appointment;
import com.example.SmartHospital_back_end.entity.Doctor;
import com.example.SmartHospital_back_end.repository.AppointmentRepository;
import com.example.SmartHospital_back_end.repository.DoctorRepository;
import com.example.SmartHospital_back_end.service.DoctorServices;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class DoctorService implements DoctorServices {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository; // Add appointment repository for checking appointments


    public String saveDoctor(DoctorDto doctorDto, MultipartFile imageFile) throws IOException {
        if (doctorRepository.existsByEmail(doctorDto.getEmail())) {
            throw new DuplicateException("A Doctor with this email already exists.");
        }

        // Map DTO to Entity
        Doctor doctor = modelMapper.map(doctorDto, Doctor.class);

        // Upload image if provided
        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = saveImageToOneDrive(imageFile);
            doctor.setImageUrl(imageUrl);
        }

        // Save doctor to database
        doctorRepository.save(doctor);
        return "Doctor saved successfully";
    }

    public List<DoctorDto> getAllDoctors() {
        List<Doctor> doctorList = doctorRepository.findAll();
        if (doctorList.isEmpty()) {
            throw new NotFoundException("No Doctors found in the database.");
        }
        List<DoctorDto> doctorDtos = modelMapper.map(doctorList, new TypeToken<List<DoctorDto>>() {}.getType());

        // Ensure the image paths are correctly formatted
        doctorDtos.forEach(doctorDto -> {
            if (doctorDto.getImageUrl() != null) {
                doctorDto.setImageUrl("/uploads/" + doctorDto.getImageUrl());
            }
        });

        return doctorDtos;
    }

    public DoctorDto getDoctorById(long doctorId) {
        Doctor doctor = doctorRepository.getDoctorById(doctorId);
        if (doctor == null) {
            throw new NotFoundException("Doctor with ID " + doctorId + " not found.");
        }
        DoctorDto doctorDto = modelMapper.map(doctor, DoctorDto.class);

        if (doctorDto.getImageUrl() != null) {
            doctorDto.setImageUrl("/uploads/" + doctorDto.getImageUrl());
        }

        return doctorDto;
    }

    public String updateDoctor(long doctorId, DoctorDto doctorDto, MultipartFile imageFile) throws IOException {
        if (!doctorRepository.existsById(doctorId)) {
            throw new NotFoundException("Doctor not found with ID " + doctorId);
        }

        Doctor doctor = doctorRepository.getDoctorById(doctorId);

        // Update doctor details
        doctor.setFullName(doctorDto.getFullName());
        doctor.setAddress(doctorDto.getAddress());
        doctor.setGender(Doctor.Gender.valueOf(doctorDto.getGender()));
        doctor.setPhoneNumber(doctorDto.getPhoneNumber());
        doctor.setDegree(doctorDto.getDegree());
        doctor.setDepartment(doctorDto.getDepartment());
        doctor.setTitle(doctorDto.getTitle());
        doctor.setDescription(doctorDto.getDescription());
        doctor.setFees(doctorDto.getFees());

        // Upload new image if provided
        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = saveImageToOneDrive(imageFile);
            doctor.setImageUrl(imageUrl);
        } else if (doctorDto.getImageUrl() != null) {
            doctor.setImageUrl(doctorDto.getImageUrl()); // Preserve existing image if no new one is uploaded
        }

        // Save updated doctor details
        doctorRepository.save(doctor);

        return "Doctor updated successfully.";
    }

    public String deleteDoctorById(long doctorId) {
        // Check if doctor exists
        if (!doctorRepository.existsById(doctorId)) {
            throw new NotFoundException("Doctor with ID " + doctorId + " not found.");
        }

        // Check if there are any appointments associated with this doctor
        List<Appointment> appointments = appointmentRepository.findByDoctor_DoctorId(doctorId);
        if (!appointments.isEmpty()) {
            throw new DuplicateException("Doctor has associated appointments and cannot be deleted.");
        }

        // Proceed with doctor deletion if no appointments are found
        doctorRepository.deleteById(doctorId);
        return "Doctor deleted successfully.";
    }


    public String deleteDoctorByEmail(String email) {
        // Check if doctor exists by email
        Doctor doctor = doctorRepository.findByEmail(email);
        if (doctor == null) {
            throw new NotFoundException("Doctor with email " + email + " not found.");
        }

        // Check if there are any appointments associated with this doctor
        List<Appointment> appointments = appointmentRepository.findByDoctor_DoctorId(doctor.getDoctorId());
        if (!appointments.isEmpty()) {
            throw new DuplicateException("Doctor has associated appointments and cannot be deleted.");
        }

        // Proceed with doctor deletion if no appointments are found
        doctorRepository.deleteById(doctor.getDoctorId());
        return "Doctor deleted successfully.";
    }


    private String saveImageToOneDrive(MultipartFile image) throws IOException {
        // Implement logic to save image to OneDrive and return the file path (simulated)
        String oneDriveFilePath = "onedrive/uploaded_images/" + image.getOriginalFilename();
        // Code to upload image to OneDrive (for this example, it's a placeholder)
        return oneDriveFilePath;
    }
}
