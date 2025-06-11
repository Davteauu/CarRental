package com.projectjava.services.customer;

import com.projectjava.dto.BookACarDto;
import com.projectjava.dto.CarDto;
import com.projectjava.dto.CarDtoListDto;
import com.projectjava.dto.SearchCarDto;

import java.util.List;

public interface CustomerService {

    List<CarDto> getAllCars();

    boolean bookACar(BookACarDto bookACarDto);

    CarDto getCarById(Long carId);

    List<BookACarDto> getBookingsByUserId(Long userId);

    CarDtoListDto searchCar(SearchCarDto searchCarDto);

}
