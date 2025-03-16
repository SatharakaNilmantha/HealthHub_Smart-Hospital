package com.example.SmartHospital_back_end.controller;

import com.example.SmartHospital_back_end.Exception.DuplicateException;
import com.example.SmartHospital_back_end.Exception.NotFoundException;
import com.example.SmartHospital_back_end.dto.FrontDeskRegisterDto;
import com.example.SmartHospital_back_end.service.FrontDeskRegisterServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/frontDeskRegisters")
public class FrontDeskRegisterController {

    @Autowired
    private FrontDeskRegisterServices frontDeskRegisterServices;

    @PostMapping("saveFrontDeskRegister")
    public ResponseEntity<String> saveFrontDeskRegister(@RequestBody FrontDeskRegisterDto frontDeskRegisterDto) {
        try {
            String response = frontDeskRegisterServices.savedFrontDeskRegister(frontDeskRegisterDto);
            return ResponseEntity.ok(response);  // Return 200 OK with success message
        } catch (DuplicateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getFrontDeskRegisters")
    public ResponseEntity<?> getAllFrontDeskRegisters() {
        try {
            List<FrontDeskRegisterDto> frontDeskRegisterList = frontDeskRegisterServices.AllFrontDeskRegisters();
            return ResponseEntity.ok(frontDeskRegisterList);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("{frontDeskId}")
    public ResponseEntity<?> updateFrontDeskRegister(@PathVariable long frontDeskId, @RequestBody FrontDeskRegisterDto frontDeskRegisterDto) {
        try {
            String updateResponse = frontDeskRegisterServices.updateFrontDeskRegister(frontDeskId, frontDeskRegisterDto);
            return new ResponseEntity<>(updateResponse, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("{frontDeskId}")
    public ResponseEntity<String> deleteFrontDeskRegisterById(@PathVariable long frontDeskId) {
        try {
            String confirmResponse = frontDeskRegisterServices.deleteFrontDeskRegisterById(frontDeskId);
            return ResponseEntity.ok(confirmResponse);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
