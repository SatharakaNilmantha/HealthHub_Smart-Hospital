package com.example.SmartHospital_back_end.service.serviceIMPL;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.EmployeeDto;
import com.example.SmartHospital_back_end.entity.Employee;
import com.example.SmartHospital_back_end.repository.EmployeeRepository;
import com.example.SmartHospital_back_end.service.EmployeeServices;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class EmployeeService implements EmployeeServices {

    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ModelMapper modelMapper;


    public String saveEmployee(EmployeeDto employeeDto, MultipartFile image) throws IOException {
        // Check if employee already exists with the same details
        boolean exists = employeeRepository.existsByFullNameAndPhoneNumberAndDepartmentAndRole(
                employeeDto.getFullName(),
                employeeDto.getPhoneNumber(),
                employeeDto.getDepartment(),
                employeeDto.getRole()
        );

        if (exists) {
            throw new DuplicateException("Employee with the same details already exists.");
        }
        if (employeeRepository.existsByEmail(employeeDto.getEmail())) {
            throw new DuplicateException("An Employee with this email already exists.");
        }

        // Map DTO to Entity
        Employee employee = modelMapper.map(employeeDto, Employee.class);

        // Save image if uploaded
        if (image != null && !image.isEmpty()) {
            String filePath = saveImageToOneDrive(image);
            employee.setImagePath(filePath);
        }

        // Save employee to database
        employeeRepository.save(employee);
        return "Employee saved successfully";
    }


    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employeeList = employeeRepository.findAll();
        if (employeeList.isEmpty()) {
            throw new NotFoundException("No Employee found in the database.");
        }
        List<EmployeeDto> employeeDtos = modelMapper.map(employeeList, new TypeToken<List<EmployeeDto>>() {}.getType());
        employeeDtos.forEach(employeeDto -> {
            if (employeeDto.getImagePath() != null) {
                employeeDto.setImagePath("/uploads/" + employeeDto.getImagePath()); // Exposing image path
            }
        });
        return employeeDtos;
    }


    public EmployeeDto getEmployeeById(long employeeId) {
        Employee employee = employeeRepository.findById(employeeId);
        if (employee == null) {
            throw new NotFoundException("Employee with ID " + employeeId + " not found.");
        }
        EmployeeDto employeeDto = modelMapper.map(employee, EmployeeDto.class);
        if (employeeDto.getImagePath() != null) {
            employeeDto.setImagePath("/uploads/" + employeeDto.getImagePath()); // Exposing image path
        }
        return employeeDto;
    }


    public String updateEmployee(long employeeId, EmployeeDto employeeDto, MultipartFile image) throws IOException {
        if (!employeeRepository.existsById(employeeId)) {
            throw new NotFoundException("Employee not found with ID " + employeeId);
        }

        Employee employee = employeeRepository.findById(employeeId);

        // Update the employee details with the new values
        employee.setFullName(employeeDto.getFullName());
        employee.setAddress(employeeDto.getAddress());
        employee.setGender(Employee.Gender.valueOf(employeeDto.getGender()));
        employee.setPhoneNumber(employeeDto.getPhoneNumber());
        employee.setDepartment(employeeDto.getDepartment());
        employee.setRole(employeeDto.getRole());
        employee.setSalary(employeeDto.getSalary());  // Update salary
        employee.setShiftStartTime(employeeDto.getShiftStartTime());  // Update shiftStartTime
        employee.setShiftEndTime(employeeDto.getShiftEndTime());  // Update shiftEndTime

        // Save image if uploaded
        if (image != null && !image.isEmpty()) {
            String filePath = saveImageToOneDrive(image);
            employee.setImagePath(filePath);  // Update image path
        } else if (employeeDto.getImagePath() != null) {
            employee.setImagePath(employeeDto.getImagePath());  // Preserve existing image if no new image is uploaded
        }

        // Update employee details in the database
        employeeRepository.save(employee);  // Save the updated employee

        return "Employee updated successfully.";
    }


    public String deleteEmployeeById(long employeeId) {
        if (!employeeRepository.existsById(employeeId)) {
            throw new NotFoundException("Employee not found with ID " + employeeId);
        }
        employeeRepository.DeleteEmployeeById(employeeId);
        return "Employee deleted successfully.";
    }

    private String saveImageToOneDrive(MultipartFile image) throws IOException {
        // Implement logic to save image to OneDrive and return the file path (simulated)
        String oneDriveFilePath = "onedrive/uploaded_images/" + image.getOriginalFilename();
        // Code to upload image to OneDrive (for this example, it's a placeholder)
        return oneDriveFilePath;
    }
}
