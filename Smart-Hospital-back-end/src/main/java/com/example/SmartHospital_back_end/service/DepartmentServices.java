package com.example.SmartHospital_back_end.service;

import com.example.SmartHospital_back_end.dto.DepartmentDto;

import java.util.List;

public interface DepartmentServices {

    String saveDepartment(DepartmentDto departmentDto);

    List<DepartmentDto> getAllDepartments();
    public DepartmentDto getDepartmentById(long departmentId);
    String updateDepartment(long departmentId, DepartmentDto departmentDto);

    String deleteDepartmentById(long departmentId);
}
