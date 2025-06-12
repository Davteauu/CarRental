package com.projectjava;

import org.junit.jupiter.api.BeforeEach;
import com.projectjava.dto.CarDto;
import com.projectjava.dto.CarDtoListDto;
import com.projectjava.dto.SearchCarDto;
import com.projectjava.entity.Car;
import com.projectjava.repository.CarRepository;
import com.projectjava.services.admin.AdminServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Example;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static net.bytebuddy.matcher.ElementMatchers.any;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class AdminServiceImplTest {
    @Mock
    private CarRepository carRepository;

    @InjectMocks
    private AdminServiceImpl adminService;

    private CarDto carDto;
    private Car existingCar;

    @BeforeEach
    void setUp() {
        carDto = new CarDto();
        carDto.setName("BMW X5");
        carDto.setBrand("BMW");
        carDto.setPrice(30000L);
        carDto.setYear("2021");
        carDto.setType("SUV");
        carDto.setDescription("Luxury SUV");
        carDto.setTransmission("Automatic");
        carDto.setColor("Black");

        existingCar = new Car();
    }

    @Test
    void searchCar_shouldReturnMatchingCars() {
        // Arrange (dane wejściowe)
        SearchCarDto searchDto = new SearchCarDto();
        searchDto.setBrand("Toyota");
        searchDto.setType("SUV");
        searchDto.setTransmission("Automatic");
        searchDto.setColor("Black");

        Car car = new Car();
        car.setBrand("Toyota");
        car.setType("SUV");
        car.setTransmission("Automatic");
        car.setColor("Black");

        CarDto carDto = new CarDto();
        carDto.setBrand("Toyota");
        carDto.setType("SUV");
        carDto.setTransmission("Automatic");
        carDto.setColor("Black");

        // symulacja mapowania (jeśli nie używasz mappera, mockuj getCarDto)
        when(car.getCarDto()).thenReturn(carDto);

        // symulacja odpowiedzi repozytorium
        @SuppressWarnings("unchecked")
        Example<Car> anyExample = (Example<Car>) any();
        when(carRepository.findAll(anyExample)).thenReturn(List.of(car));


        // Act
        CarDtoListDto result = adminService.searchCar(searchDto);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getCarDtoList().size());
        assertEquals("Toyota", result.getCarDtoList().get(0).getBrand());
    }



    @Test
    void updateCar_shouldUpdateCar_whenCarExistsAndImageIsProvided() throws IOException, IOException {
        Long carId = 1L;

        MultipartFile image = mock(MultipartFile.class);
        byte[] imageBytes = "test-image".getBytes();
        when(image.getBytes()).thenReturn(imageBytes);
        carDto.setImage(image);

        when(carRepository.findById(carId)).thenReturn(Optional.of(existingCar));

        boolean result = adminService.updateCar(carId, carDto);

        assertTrue(result);
        assertEquals("BMW X5", existingCar.getName());
        assertEquals("BMW", existingCar.getBrand());
        assertEquals(30000L, existingCar.getPrice());
        assertArrayEquals(imageBytes, existingCar.getImage());
        verify(carRepository).save(existingCar);
    }

    @Test
    void updateCar_shouldUpdateCarWithoutImage_whenImageIsNull() {
        Long carId = 2L;
        carDto.setImage(null);

        when(carRepository.findById(carId)).thenReturn(Optional.of(existingCar));

        boolean result = adminService.updateCar(carId, carDto);

        assertTrue(result);
        assertEquals("BMW X5", existingCar.getName());
        verify(carRepository).save(existingCar);
    }

    @Test
    void updateCar_shouldReturnFalse_whenCarDoesNotExist() {
        Long carId = 3L;
        when(carRepository.findById(carId)).thenReturn(Optional.empty());

        boolean result = adminService.updateCar(carId, carDto);

        assertFalse(result);
        verify(carRepository, never()).save(Mockito.<Car>any());


    }

    @Test
    void updateCar_shouldReturnFalse_whenImageProcessingFails() throws IOException {
        Long carId = 4L;
        MultipartFile image = mock(MultipartFile.class);
        when(image.getBytes()).thenThrow(new IOException("Error reading image"));
        carDto.setImage(image);

        when(carRepository.findById(carId)).thenReturn(Optional.of(existingCar));

        boolean result = adminService.updateCar(carId, carDto);

        assertFalse(result);
        verify(carRepository, never()).save(Mockito.<Car>any());

    }

    @Test
    void postCar_shouldSaveCarAndReturnTrue_whenAllDataIsValid() throws IOException {
        CarDto carDto = new CarDto();
        carDto.setName("Toyota");
        carDto.setBrand("Toyota");
        carDto.setColor("Blue");
        carDto.setPrice(25000L);
        carDto.setYear("2022");
        carDto.setType("SUV");
        carDto.setDescription("A reliable car");
        carDto.setTransmission("Automatic");

        MultipartFile image = mock(MultipartFile.class);
        byte[] imageBytes = "image-data".getBytes();
        when(image.getBytes()).thenReturn(imageBytes);
        carDto.setImage(image);

        boolean result = adminService.postCar(carDto);

        assertTrue(result);
        verify(carRepository).save(Mockito.<Car>any());
    }

    @Test
    void postCar_shouldReturnFalse_whenImageThrowsException() throws IOException {
        CarDto carDto = new CarDto();
        carDto.setName("Toyota");
        carDto.setBrand("Toyota");
        carDto.setColor("Blue");
        carDto.setPrice(25000L);
        carDto.setYear("2022");
        carDto.setType("SUV");
        carDto.setDescription("A reliable car");
        carDto.setTransmission("Automatic");

        MultipartFile image = mock(MultipartFile.class);
        when(image.getBytes()).thenThrow(new IOException("Error getting bytes"));
        carDto.setImage(image);

        boolean result = adminService.postCar(carDto);

        assertFalse(result);
        verify(carRepository, never()).save(Mockito.<Car>any());
    }
}
