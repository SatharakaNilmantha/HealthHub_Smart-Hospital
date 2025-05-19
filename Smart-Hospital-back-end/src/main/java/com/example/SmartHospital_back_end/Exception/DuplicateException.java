package com.example.SmartHospital_back_end.Exception;

public class DuplicateException extends RuntimeException{

    public  DuplicateException(String message){
        super(message);
    }
}
