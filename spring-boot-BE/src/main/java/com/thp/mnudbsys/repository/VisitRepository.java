package com.thp.mnudbsys.repository;

import com.thp.mnudbsys.entity.Visit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitRepository extends JpaRepository<Visit, String> {
    Page<Visit> findBySerialNo(String sn, Pageable pageable);
}
