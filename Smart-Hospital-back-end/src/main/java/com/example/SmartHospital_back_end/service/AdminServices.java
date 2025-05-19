package com.example.SmartHospital_back_end.service;

import com.example.SmartHospital_back_end.dto.AdminDto;


import java.util.List;

public interface AdminServices {

    public  String savedAdmin (AdminDto adminDto);

    public List<AdminDto> AllAdmin();

    public String deleteAdminById(long adminId);

    String deleteAdminByEmail(String email);

    String loginAdmin(String email, String password);

    public String updateAdminPassword(String email, AdminDto adminDto);
}
