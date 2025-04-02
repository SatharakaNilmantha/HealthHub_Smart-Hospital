package com.example.SmartHospital_back_end.adminTest;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.controller.AdminController;
import com.example.SmartHospital_back_end.dto.AdminDto;
import com.example.SmartHospital_back_end.service.AdminServices;
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

class AdminControllerTest {

    @Mock
    private AdminServices adminServices;

    @InjectMocks
    private AdminController adminController;

    private static final Logger logger = LoggerFactory.getLogger(AdminControllerTest.class);

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveAdmin_Success() {
        // Log the process
        logger.info("Starting saveAdmin_Success test");

        AdminDto adminDto = new AdminDto();
        adminDto.setEmail("admin@example.com");
        adminDto.setPassword("password");

        when(adminServices.savedAdmin(adminDto)).thenReturn("Admin Details Saved Successfully");

        ResponseEntity<String> response = adminController.saveAdmin(adminDto);

        // Log response details
        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Admin Details Saved Successfully", response.getBody());
    }

    @Test
    void saveAdmin_DuplicateEmail() {
        logger.info("Starting saveAdmin_DuplicateEmail test");

        AdminDto adminDto = new AdminDto();
        adminDto.setEmail("admin@example.com");
        adminDto.setPassword("password");

        when(adminServices.savedAdmin(adminDto)).thenThrow(new DuplicateException("An Admin with this email already exists."));

        ResponseEntity<String> response = adminController.saveAdmin(adminDto);

        // Log response details
        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("An Admin with this email already exists.", response.getBody());
    }

    @Test
    void getAllAdmin_Success() {
        logger.info("Starting getAllAdmin_Success test");

        AdminDto admin1 = new AdminDto();
        admin1.setAdminId(1L);
        admin1.setEmail("admin1@example.com");

        AdminDto admin2 = new AdminDto();
        admin2.setAdminId(2L);
        admin2.setEmail("admin2@example.com");

        List<AdminDto> adminList = Arrays.asList(admin1, admin2);

        when(adminServices.AllAdmin()).thenReturn(adminList);

        ResponseEntity<?> response = adminController.getAllAdmin();

        // Log response details
        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(adminList, response.getBody());
    }

    @Test
    void getAllAdmin_NotFound() {
        logger.info("Starting getAllAdmin_NotFound test");

        when(adminServices.AllAdmin()).thenThrow(new NotFoundException("No admins found in the database."));

        ResponseEntity<?> response = adminController.getAllAdmin();

        // Log response details
        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("No admins found in the database.", response.getBody());
    }

    @Test
    void deleteAdminById_Success() {
        logger.info("Starting deleteAdminById_Success test");

        long adminId = 1L;
        when(adminServices.deleteAdminById(adminId)).thenReturn("Deleted successfully " + adminId);

        ResponseEntity<String> response = adminController.deleteAdminById(adminId);

        // Log response details
        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Deleted successfully 1", response.getBody());
    }

    @Test
    void deleteAdminById_NotFound() {
        logger.info("Starting deleteAdminById_NotFound test");

        long adminId = 1L;
        when(adminServices.deleteAdminById(adminId)).thenThrow(new NotFoundException("Doctor with ID " + adminId + " not found or couldn't be deleted."));

        ResponseEntity<String> response = adminController.deleteAdminById(adminId);

        // Log response details
        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Doctor with ID 1 not found or couldn't be deleted.", response.getBody());
    }

    @Test
    void updateAdminPassword_Success() {
        logger.info("Starting updateAdminPassword_Success test");

        String email = "admin@example.com";
        AdminDto adminDto = new AdminDto();
        adminDto.setCurrentPassword("oldPassword");
        adminDto.setPassword("newPassword");

        when(adminServices.updateAdminPassword(email, adminDto)).thenReturn("Password updated successfully");

        ResponseEntity<?> response = adminController.updateAdminPassword(email, adminDto);

        // Log response details
        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Password updated successfully", response.getBody());
    }

    @Test
    void loginAdmin_Success() {
        logger.info("Starting loginAdmin_Success test");

        AdminController.LoginRequest loginRequest = new AdminController.LoginRequest();
        loginRequest.setEmail("admin@example.com");
        loginRequest.setPassword("password");

        when(adminServices.loginAdmin("admin@example.com", "password")).thenReturn("Login successful!");

        ResponseEntity<Object> response = adminController.loginAdmin(loginRequest);

        // Log response details
        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", ((AdminController.MessageResponse) response.getBody()).getMessage());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Login successful!", ((AdminController.MessageResponse) response.getBody()).getMessage());
    }
}
