package com.projectjava.services.admin;

import com.projectjava.dto.CarDto;
import com.projectjava.entity.Car;

import java.util.List;

public interface AdminService {

    boolean postCar(CarDto carDto);

    List<CarDto> getAllCars();

    void deleteCar(Long id);

    CarDto getCarById(Long id);

    boolean updateCar(Long carid, CarDto carDto);

}
