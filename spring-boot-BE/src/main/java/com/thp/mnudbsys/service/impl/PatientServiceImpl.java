package com.thp.mnudbsys.service.impl;

import com.thp.mnudbsys.dto.request.PatientDto;
import com.thp.mnudbsys.entity.Patient;
import com.thp.mnudbsys.exception.AlreadyExistsException;
import com.thp.mnudbsys.exception.ResourceNotFoundException;
import com.thp.mnudbsys.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
@Transactional
public class PatientServiceImpl {
    private final PatientRepository patientRepository;


    public Page<Patient> getAll(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return patientRepository.findAll(pageable);
    }


    public Patient getPatientBySn(String sn) {
        Patient patient = patientRepository.findBySerialNo(sn)
                .orElseThrow(() -> new ResourceNotFoundException("Patient with serial no. " + sn + " not found"));
        return patient;
    }

    public Patient getPatientByPhone(String phone) {
        Patient patient = patientRepository.findByPhone(phone)
                .orElseThrow(() -> new ResourceNotFoundException("Patient with phone no. " + phone + " not found"));
        return patient;
    }

    public Patient setPatient(PatientDto patientDto) {
        if (patientRepository.findBySerialNo(patientDto.serialNo()).isPresent()) {
            throw new AlreadyExistsException("Patient exists for serial no.");
        }
        if (patientRepository.findByPhone(patientDto.phone()).isPresent()) {
            throw new AlreadyExistsException("Patient exists for phone no.");
        }

        long duration = ChronoUnit.YEARS.between(patientDto.dob(), LocalDate.now());
        Patient patient = new Patient(
                patientDto.serialNo(),
                patientDto.name(),
                patientDto.gender(),
                patientDto.dob(),
                duration,
                patientDto.phone(),
                patientDto.address()
        );
        return patientRepository.save(patient);
    }

    public Patient updatePatient(String sn, PatientDto patientDto) {
        Patient patient = patientRepository.findBySerialNo(sn)
                .orElseThrow(() -> new ResourceNotFoundException("Patient with serial no. " + sn + " not found"));
        patient.setName(patientDto.name());
        patient.setGender(patientDto.gender());
        patient.setDob(patientDto.dob());
        patient.setPhone(patientDto.phone());
        patient.setAddress(patientDto.address());
        return patientRepository.save(patient);
    }

    public void deletePatient(String sn) {
        Patient patient = patientRepository.findBySerialNo(sn)
                .orElseThrow(() -> new ResourceNotFoundException("Patient with serial no. " + sn + " not found"));
        patientRepository.delete(patient);
    }
}
