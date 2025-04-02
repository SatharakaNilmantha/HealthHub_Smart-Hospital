package com.example.SmartHospital_back_end.patientTest;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.controller.PatientController;
import com.example.SmartHospital_back_end.dto.PatientDto;
import com.example.SmartHospital_back_end.service.PatientServices;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class PatientControllerTest {

    @Mock
    private PatientServices patientServices;

    @InjectMocks
    private PatientController patientController;

    private static final Logger logger = LoggerFactory.getLogger(PatientControllerTest.class);

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void savePatient_Success() throws DuplicateException {
        logger.info("Starting savePatient_Success test");

        PatientDto patientDto = new PatientDto();
        patientDto.setEmail("patient@example.com");
        when(patientServices.patientSaved(patientDto)).thenReturn("Patient saved successfully");

        ResponseEntity<String> response = patientController.savePatient(patientDto);

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Patient saved successfully", response.getBody());
    }

    @Test
    void savePatient_DuplicateEmail() throws DuplicateException {
        logger.info("Starting savePatient_DuplicateEmail test");

        PatientDto patientDto = new PatientDto();
        patientDto.setEmail("duplicate@example.com");
        when(patientServices.patientSaved(patientDto)).thenThrow(new DuplicateException("Email already exists"));

        ResponseEntity<String> response = patientController.savePatient(patientDto);

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Email already exists", response.getBody());
    }

    @Test
    void getAllPatient_Success() {
        logger.info("Starting getAllPatient_Success test");

        PatientDto patient1 = new PatientDto();
        patient1.setPatientId(1L);
        patient1.setEmail("patient1@example.com");

        PatientDto patient2 = new PatientDto();
        patient2.setPatientId(2L);
        patient2.setEmail("patient2@example.com");

        List<PatientDto> patientList = Arrays.asList(patient1, patient2);
        when(patientServices.AllPatient()).thenReturn(patientList);

        ResponseEntity<List<PatientDto>> response = patientController.getAllPatient();

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        assertEquals("patient1@example.com", response.getBody().get(0).getEmail());
    }

    @Test
    void getPatientById_Success() throws NotFoundException {
        logger.info("Starting getPatientById_Success test");

        PatientDto patientDto = new PatientDto();
        patientDto.setPatientId(1L);
        patientDto.setEmail("patient@example.com");
        when(patientServices.getPatientById(1L)).thenReturn(patientDto);

        ResponseEntity<?> response = patientController.getPatientById(1L);

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(patientDto, response.getBody());
    }

    @Test
    void getPatientById_NotFound() throws NotFoundException {
        logger.info("Starting getPatientById_NotFound test");

        when(patientServices.getPatientById(1L)).thenThrow(new NotFoundException("Patient not found"));

        ResponseEntity<?> response = patientController.getPatientById(1L);

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Patient not found", response.getBody());
    }

    @Test
    void updatePatient_Success() {
        logger.info("Starting updatePatient_Success test");

        PatientDto patientDto = new PatientDto();
        patientDto.setPatientId(1L);
        when(patientServices.updatePatient(1L, patientDto)).thenReturn("Patient updated successfully");

        ResponseEntity<?> response = patientController.updatePatient(1L, patientDto);

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Patient updated successfully", response.getBody());
    }

    @Test
    void updatePatient_NotFound() {
        logger.info("Starting updatePatient_NotFound test");

        PatientDto patientDto = new PatientDto();
        patientDto.setPatientId(1L);
        when(patientServices.updatePatient(1L, patientDto)).thenThrow(new RuntimeException("Patient not found"));

        ResponseEntity<?> response = patientController.updatePatient(1L, patientDto);

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Patient not found", response.getBody());
    }

    @Test
    void updatePatientPassword_Success() {
        logger.info("Starting updatePatientPassword_Success test");

        PatientDto patientDto = new PatientDto();
        patientDto.setPatientId(1L);
        when(patientServices.updatePatientPassword(1L, patientDto)).thenReturn("Password updated successfully");

        ResponseEntity<?> response = patientController.updatePatientPassword(1L, patientDto);

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Password updated successfully", response.getBody());
    }

    @Test
    void updatePatientPassword_BadRequest() {
        logger.info("Starting updatePatientPassword_BadRequest test");

        PatientDto patientDto = new PatientDto();
        patientDto.setPatientId(1L);
        when(patientServices.updatePatientPassword(1L, patientDto)).thenThrow(new IllegalArgumentException("Current password is incorrect"));

        ResponseEntity<?> response = patientController.updatePatientPassword(1L, patientDto);

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Current password is incorrect", response.getBody());
    }

    @Test
    void loginPatient_Success() {
        logger.info("Starting loginPatient_Success test");

        PatientDto patientDto = new PatientDto();
        patientDto.setPatientId(1L);
        patientDto.setEmail("patient@example.com");
        when(patientServices.loginPatient("patient@example.com", "password")).thenReturn(patientDto);

        ResponseEntity<Object> response = patientController.loginPatient("patient@example.com", "password");

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", ((PatientController.LoginResponse) response.getBody()).getMessage());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        PatientController.LoginResponse loginResponse = (PatientController.LoginResponse) response.getBody();
        assertEquals(1L, loginResponse.getPatientId());
        assertEquals("patient@example.com", loginResponse.getEmail());
        assertEquals("Login successful!", loginResponse.getMessage());
    }
}
