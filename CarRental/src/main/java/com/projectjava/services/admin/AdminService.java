package com.projectjava.services.admin;

import com.projectjava.dto.BookACarDto;
import com.projectjava.dto.CarDto;
import com.projectjava.dto.CarDtoListDto;
import com.projectjava.dto.SearchCarDto;
import com.projectjava.entity.Car;

import java.util.List;

public interface AdminService {

    boolean postCar(CarDto carDto);

    List<CarDto> getAllCars();

    void deleteCar(Long id);

    CarDto getCarById(Long id);

    boolean updateCar(Long carid, CarDto carDto);

    List<BookACarDto> getBookings();

    boolean changeBookingStatus(Long bookingId, String status);

    CarDtoListDto searchCar(SearchCarDto searchCarDto);

}
