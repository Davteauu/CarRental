package com.projectjava.services.admin;

import com.projectjava.dto.BookACarDto;
import com.projectjava.dto.CarDto;
import com.projectjava.dto.CarDtoListDto;
import com.projectjava.dto.SearchCarDto;
import com.projectjava.entity.BookACar;
import com.projectjava.entity.Car;
import com.projectjava.enums.BookCarStatus;
import com.projectjava.repository.BookACarRepository;
import com.projectjava.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final CarRepository carRepository;

    private final BookACarRepository bookACarRepository;

    @Override
    public boolean postCar(CarDto carDto) {
        try{
            Car car = new Car();
            car.setName(carDto.getName());
            car.setBrand(carDto.getBrand());
            car.setColor(carDto.getColor());
            car.setPrice(carDto.getPrice());
            car.setYear(carDto.getYear());
            car.setType(carDto.getType());
            car.setDescription(carDto.getDescription());
            car.setTransmission(carDto.getTransmission());
            car.setImage(carDto.getImage().getBytes());
            carRepository.save(car);
            return true;
        }catch(Exception e){
            return false;
        }

    }

    @Override
    public List<CarDto> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
    }

    @Override
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    @Override
    public CarDto getCarById(Long id) {
        Optional<Car> optionalCar = carRepository.findById(id);
        return optionalCar.map(Car::getCarDto).orElse(null);

    }

    @Override
    public boolean updateCar(Long carid, CarDto carDto) {
        Optional<Car> optionalCar = carRepository.findById(carid);
        if(optionalCar.isPresent()){
            Car existingCar = optionalCar.get();
            if(carDto.getImage() != null)
                try {
                    existingCar.setImage(carDto.getImage().getBytes());
                } catch (IOException e) {
                    e.printStackTrace();
                    return false;
                }
            existingCar.setPrice(carDto.getPrice());
            existingCar.setYear(carDto.getYear());
            existingCar.setType(carDto.getType());
            existingCar.setDescription(carDto.getDescription());
            existingCar.setTransmission(carDto.getTransmission());
            existingCar.setColor(carDto.getColor());
            existingCar.setName(carDto.getName());
            existingCar.setBrand(carDto.getBrand());
            carRepository.save(existingCar);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<BookACarDto> getBookings() {
        return bookACarRepository.findAll().stream().map(BookACar::getBookACarDto).collect(Collectors.toList());
    }

    @Override
    public boolean changeBookingStatus(Long bookingId, String status) {
        Optional<BookACar> optionalBookACar = bookACarRepository.findById(bookingId);
        if(optionalBookACar.isPresent()){
            BookACar existingBookACar = optionalBookACar.get();
            if(Objects.equals(status, "Approve")){
                existingBookACar.setBookCarStatus((BookCarStatus.APPROVED));
            }
            else{
                existingBookACar.setBookCarStatus((BookCarStatus.REJECTED));
                bookACarRepository.save(existingBookACar);
                return true;
            }

        }
        return false;
    }

    @Override
    public CarDtoListDto searchCar(SearchCarDto searchCarDto){
        Car car = new Car();
        car.setBrand(searchCarDto.getBrand());
        car.setType(searchCarDto.getType());
        car.setTransmission(searchCarDto.getTransmission());
        car.setColor(searchCarDto.getColor());
        ExampleMatcher exampleMatcher =
                ExampleMatcher.matching()
                    .withMatcher("brand", ExampleMatcher.GenericPropertyMatchers.ignoreCase())
                    .withMatcher("type", ExampleMatcher.GenericPropertyMatchers.ignoreCase())
                    .withMatcher("transmission", ExampleMatcher.GenericPropertyMatchers.ignoreCase())
                    .withMatcher("color", ExampleMatcher.GenericPropertyMatchers.ignoreCase());
        Example<Car> carExample = Example.of(car, exampleMatcher);
        List<Car> carList = carRepository.findAll(carExample);
        CarDtoListDto carDtoListDto = new CarDtoListDto();
        carDtoListDto.setCarDtoList(carList.stream().map(Car::getCarDto).collect(Collectors.toList()));
        return carDtoListDto;

    }
}
