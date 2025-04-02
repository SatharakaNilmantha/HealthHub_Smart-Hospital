package com.example.SmartHospital_back_end.EmployeeTest;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.controller.EmployeeController;
import com.example.SmartHospital_back_end.dto.EmployeeDto;
import com.example.SmartHospital_back_end.service.EmployeeServices;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class EmployeeControllerTest {

    @Mock
    private EmployeeServices employeeServices;

    @InjectMocks
    private EmployeeController employeeController;

    private static final Logger logger = LoggerFactory.getLogger(EmployeeControllerTest.class);

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveEmployee_Success() throws Exception {
        logger.info("Starting saveEmployee_Success test");

        EmployeeDto employeeDto = new EmployeeDto();
        employeeDto.setEmail("employee@example.com");

        MultipartFile image = mock(MultipartFile.class);
        when(employeeServices.saveEmployee(employeeDto, image)).thenReturn("Employee saved successfully");

        String employeeDtoJson = new ObjectMapper().writeValueAsString(employeeDto);

        ResponseEntity<String> response = employeeController.saveEmployee(employeeDtoJson, image);

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Employee saved successfully", response.getBody());
    }

    @Test
    void saveEmployee_DuplicateEmail() throws Exception {
        logger.info("Starting saveEmployee_DuplicateEmail test");

        EmployeeDto employeeDto = new EmployeeDto();
        employeeDto.setEmail("duplicate@example.com");

        MultipartFile image = mock(MultipartFile.class);
        when(employeeServices.saveEmployee(employeeDto, image)).thenThrow(new DuplicateException("Email already exists"));

        String employeeDtoJson = new ObjectMapper().writeValueAsString(employeeDto);

        ResponseEntity<String> response = employeeController.saveEmployee(employeeDtoJson, image);

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Email already exists", response.getBody());
    }

    @Test
    void getAllEmployees_Success() {
        logger.info("Starting getAllEmployees_Success test");

        // Create EmployeeDto instances
        EmployeeDto employee1 = new EmployeeDto();
        employee1.setEmployeeId(1L);
        employee1.setEmail("employee1@example.com");

        EmployeeDto employee2 = new EmployeeDto();
        employee2.setEmployeeId(2L);
        employee2.setEmail("employee2@example.com");


        // Create a list of EmployeeDto using Arrays.asList()
        List<EmployeeDto> employeeList = Arrays.asList(employee1, employee2);


        // Mock the service call to return the employee list
        when(employeeServices.getAllEmployees()).thenReturn(employeeList);

        // Call the controller method
        ResponseEntity<List<EmployeeDto>> response = employeeController.getAllEmployees();

        // Log the response details
        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        // Assertions
        assertEquals(HttpStatus.OK, response.getStatusCode()); // Ensure HTTP status is OK
        assertEquals(2, response.getBody().size()); // Ensure the list has 2 employees
        assertEquals("employee1@example.com", response.getBody().get(0).getEmail()); // Ensure the first employee's email is correct
        assertEquals("employee2@example.com", response.getBody().get(1).getEmail()); // Ensure the second employee's email is correct
    }


    @Test
    void getEmployeeById_Success() throws NotFoundException {
        logger.info("Starting getEmployeeById_Success test");

        EmployeeDto employeeDto = new EmployeeDto();
        employeeDto.setEmployeeId(1L);
        employeeDto.setEmail("employee@example.com");

        when(employeeServices.getEmployeeById(1L)).thenReturn(employeeDto);

        ResponseEntity<?> response = employeeController.getEmployeeById(1L);

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(employeeDto, response.getBody());
    }

    @Test
    void getEmployeeById_NotFound() throws NotFoundException {
        logger.info("Starting getEmployeeById_NotFound test");

        when(employeeServices.getEmployeeById(1L)).thenThrow(new NotFoundException("Employee not found"));

        ResponseEntity<?> response = employeeController.getEmployeeById(1L);

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Employee not found", response.getBody());
    }

    @Test
    void updateEmployee_Success() throws Exception {
        logger.info("Starting updateEmployee_Success test");

        EmployeeDto employeeDto = new EmployeeDto();
        employeeDto.setEmail("updated@example.com");

        MultipartFile image = mock(MultipartFile.class);
        when(employeeServices.updateEmployee(1L, employeeDto, image)).thenReturn("Employee updated successfully");

        String employeeDtoJson = new ObjectMapper().writeValueAsString(employeeDto);

        ResponseEntity<?> response = employeeController.updateEmployee(1L, employeeDtoJson, image);

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Employee updated successfully", response.getBody());
    }

    @Test
    void updateEmployee_NotFound() throws Exception {
        logger.info("Starting updateEmployee_NotFound test");

        EmployeeDto employeeDto = new EmployeeDto();
        employeeDto.setEmail("updated@example.com");

        MultipartFile image = mock(MultipartFile.class);
        when(employeeServices.updateEmployee(1L, employeeDto, image)).thenThrow(new NotFoundException("Employee not found"));

        String employeeDtoJson = new ObjectMapper().writeValueAsString(employeeDto);

        ResponseEntity<?> response = employeeController.updateEmployee(1L, employeeDtoJson, image);

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Employee not found", response.getBody());
    }

    @Test
    void deleteEmployee_Success() {
        logger.info("Starting deleteEmployee_Success test");

        when(employeeServices.deleteEmployeeById(1L)).thenReturn("Employee deleted successfully");

        ResponseEntity<String> response = employeeController.deleteEmployeeById(1L);

        logger.info("Response Status: {}", response.getStatusCode());
        logger.info("Response Body: {}", response.getBody());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Employee deleted successfully", response.getBody());
    }
}
