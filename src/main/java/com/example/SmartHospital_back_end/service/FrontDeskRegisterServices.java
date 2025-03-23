package com.example.SmartHospital_back_end.service;

import com.example.SmartHospital_back_end.dto.FrontDeskRegisterDto;

import java.util.List;

public interface FrontDeskRegisterServices {

    String savedFrontDeskRegister(FrontDeskRegisterDto frontDeskRegisterDto);

    List<FrontDeskRegisterDto> AllFrontDeskRegisters();

    String updateFrontDeskRegister(long frontDeskId, FrontDeskRegisterDto frontDeskRegisterDto);


    String deleteFrontDeskRegisterById(long frontDeskId);

    String deleteFrontDeskByEmail(String email);
}
