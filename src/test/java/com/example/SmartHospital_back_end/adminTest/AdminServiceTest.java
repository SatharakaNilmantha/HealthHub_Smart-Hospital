package com.example.SmartHospital_back_end.adminTest;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.AdminDto;
import com.example.SmartHospital_back_end.entity.Admin;
import com.example.SmartHospital_back_end.repository.AdminRepository;
import com.example.SmartHospital_back_end.service.serviceIMPL.AdminService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

class AdminServiceTest {

    @Mock
    private AdminRepository adminRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private AdminService adminService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void savedAdmin_Success() {
        AdminDto adminDto = new AdminDto();
        adminDto.setEmail("admin@example.com");
        adminDto.setPassword("password");

        Admin admin = new Admin();
        admin.setEmail("admin@example.com");
        admin.setPassword("password");

        when(adminRepository.existsByEmail("admin@example.com")).thenReturn(false);
        when(modelMapper.map(adminDto, Admin.class)).thenReturn(admin);
        when(adminRepository.save(admin)).thenReturn(admin);

        String result = adminService.savedAdmin(adminDto);

        System.out.println("Test: savedAdmin_Success");
        System.out.println("Response: " + result);
        assertEquals("Admin Details Saved Successfully", result);
    }

    @Test
    void savedAdmin_DuplicateEmail() {
        AdminDto adminDto = new AdminDto();
        adminDto.setEmail("admin@example.com");

        when(adminRepository.existsByEmail("admin@example.com")).thenReturn(true);

        System.out.println("Test: savedAdmin_DuplicateEmail");
        assertThrows(DuplicateException.class, () -> adminService.savedAdmin(adminDto));
    }

    @Test
    void AllAdmin_Success() {
        Admin admin1 = new Admin();
        admin1.setAdminId(1L);
        admin1.setEmail("admin1@example.com");

        Admin admin2 = new Admin();
        admin2.setAdminId(2L);
        admin2.setEmail("admin2@example.com");

        List<Admin> adminList = Arrays.asList(admin1, admin2);

        AdminDto adminDto1 = new AdminDto();
        adminDto1.setAdminId(1L);
        adminDto1.setEmail("admin1@example.com");

        AdminDto adminDto2 = new AdminDto();
        adminDto2.setAdminId(2L);
        adminDto2.setEmail("admin2@example.com");

        List<AdminDto> expectedDtoList = Arrays.asList(adminDto1, adminDto2);

        when(adminRepository.findAll()).thenReturn(adminList);
        when(modelMapper.map(adminList, new org.modelmapper.TypeToken<List<AdminDto>>() {}.getType()))
                .thenReturn(expectedDtoList);

        List<AdminDto> result = adminService.AllAdmin();

        System.out.println("Test: AllAdmin_Success");
        System.out.println("Result: " + result.size() + " admins found");
        assertEquals(2, result.size());
        assertEquals("admin1@example.com", result.get(0).getEmail());
    }

    @Test
    void updateAdminPassword_Success() {
        String email = "admin@example.com";
        AdminDto adminDto = new AdminDto();
        adminDto.setCurrentPassword("oldPassword");
        adminDto.setPassword("newPassword");

        Admin existingAdmin = new Admin();
        existingAdmin.setEmail("admin@example.com");
        existingAdmin.setPassword("oldPassword");

        when(adminRepository.findByEmail(email)).thenReturn(existingAdmin);
        when(adminRepository.updateAdminPassword(email, "newPassword")).thenReturn(1);

        String result = adminService.updateAdminPassword(email, adminDto);

        System.out.println("Test: updateAdminPassword_Success");
        System.out.println("Response: " + result);
        assertEquals("Password updated successfully", result);
    }

    @Test
    void deleteAdminById_Success() {
        long adminId = 1L;
        when(adminRepository.deleteAdminById(adminId)).thenReturn(1);

        String result = adminService.deleteAdminById(adminId);

        System.out.println("Test: deleteAdminById_Success");
        System.out.println("Response: " + result);
        assertEquals("Deleted successfully 1", result);
    }

    @Test
    void deleteAdminById_NotFound() {
        long adminId = 1L;
        when(adminRepository.deleteAdminById(adminId)).thenReturn(0);

        System.out.println("Test: deleteAdminById_NotFound");
        assertThrows(NotFoundException.class, () -> adminService.deleteAdminById(adminId));
    }

    @Test
    void loginAdmin_Success() {
        String email = "admin@example.com";
        String password = "password";

        Admin admin = new Admin();
        admin.setEmail(email);
        admin.setPassword(password);

        when(adminRepository.findByEmail(email)).thenReturn(admin);

        String result = adminService.loginAdmin(email, password);

        System.out.println("Test: loginAdmin_Success");
        System.out.println("Response: " + result);
        assertEquals("Login successful!", result);
    }

    @Test
    void loginAdmin_NotFound() {
        String email = "nonexistent@example.com";
        String password = "password";

        when(adminRepository.findByEmail(email)).thenReturn(null);

        System.out.println("Test: loginAdmin_NotFound");
        assertThrows(NotFoundException.class, () -> adminService.loginAdmin(email, password));
    }

    @Test
    void loginAdmin_WrongPassword() {
        String email = "admin@example.com";
        String password = "wrongPassword";

        Admin admin = new Admin();
        admin.setEmail(email);
        admin.setPassword("correctPassword");

        when(adminRepository.findByEmail(email)).thenReturn(admin);

        System.out.println("Test: loginAdmin_WrongPassword");
        assertThrows(RuntimeException.class, () -> adminService.loginAdmin(email, password));
    }
}
