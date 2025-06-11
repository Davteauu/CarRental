package com.projectjava.repository;

import com.projectjava.entity.BookACar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface BookACarRepository extends JpaRepository<BookACar, Long> {
    Collection<BookACar> findAllByUserId(Long userId);
}
