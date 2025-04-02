package com.example.SmartHospital_back_end.patientTest;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.PatientDto;
import com.example.SmartHospital_back_end.entity.Patient;
import com.example.SmartHospital_back_end.repository.PatientRepository;
import com.example.SmartHospital_back_end.service.serviceIMPL.PatientService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PatientServiceTest {

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private PatientService patientService;

    private PatientDto patientDto;
    private Patient patient;

    @BeforeEach
    void setUp() {
        patientDto = new PatientDto();
        patientDto.setEmail("test@example.com");
        patientDto.setFullName("John Doe");
        patientDto.setPassword("password123");
        patientDto.setCurrentPassword("password123");

        patient = new Patient();
        patient.setEmail("test@example.com");
        patient.setFullName("John Doe");
        patient.setPassword("password123");
    }

    @Test
    void testPatientSaved_Success() {
        when(patientRepository.existsByEmail(patientDto.getEmail())).thenReturn(false);
        when(modelMapper.map(patientDto, Patient.class)).thenReturn(patient);

        String result = patientService.patientSaved(patientDto);
        System.out.println("Test Save Patient: " + result);

        assertEquals("Patient Details Saved Successfully", result);
        verify(patientRepository, times(1)).save(any(Patient.class));
    }

    @Test
    void testPatientSaved_DuplicateEmail() {
        when(patientRepository.existsByEmail(patientDto.getEmail())).thenReturn(true);

        Exception exception = assertThrows(DuplicateException.class, () -> {
            patientService.patientSaved(patientDto);
        });
        System.out.println("Test Duplicate Email: " + exception.getMessage());
        assertEquals("A patient with this email already exists.", exception.getMessage());
    }

    @Test
    void testGetPatientById_Success() {
        long patientId = 1L;
        when(patientRepository.getPatientById(patientId)).thenReturn(patient);
        when(modelMapper.map(patient, PatientDto.class)).thenReturn(patientDto);

        PatientDto result = patientService.getPatientById(patientId);
        System.out.println("Test Get Patient: " + result.getFullName());
        assertEquals(patientDto.getFullName(), result.getFullName());
    }

    @Test
    void testGetPatientById_NotFound() {
        long patientId = 1L;
        when(patientRepository.getPatientById(patientId)).thenThrow(new NotFoundException("Patient with ID " + patientId + " not found."));

        Exception exception = assertThrows(NotFoundException.class, () -> {
            patientService.getPatientById(patientId);
        });
        System.out.println("Test Get Patient Not Found: " + exception.getMessage());
    }

    @Test
    void testLoginPatient_Success() {
        String email = "test@example.com";
        String password = "password123";
        when(patientRepository.findByEmail(email)).thenReturn(patient);
        when(modelMapper.map(patient, PatientDto.class)).thenReturn(patientDto);

        PatientDto result = patientService.loginPatient(email, password);
        System.out.println("Test Login Success: " + result.getFullName());
        assertEquals(patientDto.getFullName(), result.getFullName());
    }

    @Test
    void testLoginPatient_IncorrectPassword() {
        String email = "test@example.com";
        when(patientRepository.findByEmail(email)).thenReturn(patient);

        Exception exception = assertThrows(RuntimeException.class, () -> {
            patientService.loginPatient(email, "wrongpassword");
        });
        System.out.println("Test Incorrect Password: " + exception.getMessage());
    }

    @Test
    void testLoginPatient_NotFound() {
        String email = "notfound@example.com";
        when(patientRepository.findByEmail(email)).thenReturn(null);

        Exception exception = assertThrows(NotFoundException.class, () -> {
            patientService.loginPatient(email, "password123");
        });
        System.out.println("Test Login Not Found: " + exception.getMessage());
    }
}
