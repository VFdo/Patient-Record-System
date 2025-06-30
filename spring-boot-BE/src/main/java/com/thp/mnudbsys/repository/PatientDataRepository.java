package com.thp.mnudbsys.repository;

import com.thp.mnudbsys.entity.PatientData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientDataRepository extends JpaRepository<PatientData, String> {
    Optional<PatientData> findBySerialNo(String sn);

    @Query(value = "SELECT height_cm FROM patient_data WHERE serial_no = :patientSn", nativeQuery = true)
    Double getHeight(@Param("patientSn") String patientSn);
}
