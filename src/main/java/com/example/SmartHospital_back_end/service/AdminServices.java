package com.example.SmartHospital_back_end.service;

import com.example.SmartHospital_back_end.dto.AdminDto;

import java.util.List;

public interface AdminServices {

    public  String savedAdmin (AdminDto adminDto);

    public List<AdminDto> AllAdmin();

    public String updateAdmin(long adminId, AdminDto adminDto);

    public String deleteAdminById(long adminId);
}
