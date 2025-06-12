package com.projectjava;

import com.projectjava.dto.BookACarDto;
import com.projectjava.entity.BookACar;
import com.projectjava.entity.Car;
import com.projectjava.entity.User;
import com.projectjava.enums.BookCarStatus;
import com.projectjava.repository.BookACarRepository;
import com.projectjava.repository.CarRepository;
import com.projectjava.repository.UserRepository;
import com.projectjava.services.customer.CustomerServiceImpl;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@Transactional
class CustomerServiceTest {

    @Autowired
    private CustomerServiceImpl customerService;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookACarRepository bookACarRepository;

    @Test
    void testBookACarIntegration_success() {
        Car car = new Car();
        car.setPrice(200L);
        car = carRepository.save(car);

        User user = new User();
        user.setName("Jan Kowalski");
        user = userRepository.save(user);

        Date fromDate = new GregorianCalendar(2025, Calendar.JUNE, 1).getTime();
        Date toDate = new GregorianCalendar(2025, Calendar.JUNE, 4).getTime();

        BookACarDto dto = new BookACarDto();
        dto.setCarId(car.getId());
        dto.setUserId(user.getId());
        dto.setFromDate(fromDate);
        dto.setToDate(toDate);

        // Act
        boolean result = customerService.bookACar(dto);

        // Assert
        assertTrue(result);
        List<BookACar> bookings = bookACarRepository.findAll();
        assertEquals(1, bookings.size());

        BookACar booking = bookings.get(0);
        assertEquals(user.getId(), booking.getUser().getId());
        assertEquals(car.getId(), booking.getCar().getId());
        assertEquals(BookCarStatus.PENDING, booking.getBookCarStatus());
        assertEquals(3, booking.getDays()); // 3 dni
        assertEquals(600L, booking.getPrice()); // 3 * 200
    }
}

