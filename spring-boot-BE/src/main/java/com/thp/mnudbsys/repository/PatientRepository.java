package com.thp.mnudbsys.repository;

import com.thp.mnudbsys.entity.Patient;
import com.thp.mnudbsys.entity.PatientData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String>  {
//    Optional<Patient> findBySn(String sn);

    Optional<Patient> findByPhone(String phone);

    Optional<Patient> findBySerialNo(String serialNo);
}
