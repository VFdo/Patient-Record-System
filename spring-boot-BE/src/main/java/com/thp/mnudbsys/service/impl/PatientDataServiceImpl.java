package com.thp.mnudbsys.service.impl;

import com.thp.mnudbsys.dto.request.PatientDataDto;
import com.thp.mnudbsys.entity.Patient;
import com.thp.mnudbsys.entity.PatientData;
import com.thp.mnudbsys.exception.AlreadyExistsException;
import com.thp.mnudbsys.exception.ResourceNotFoundException;
import com.thp.mnudbsys.repository.PatientDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PatientDataServiceImpl {
    private final PatientDataRepository patientDataRepository;

    public PatientData getPatientData(String sn) {
        PatientData patientData = patientDataRepository.findBySerialNo(sn)
                .orElseThrow(() -> new ResourceNotFoundException("Patient data with serial no. " + sn + " not found"));
        return patientData;
    }

    public PatientData setPatientData(PatientDataDto patientDataDto) {
        if (patientDataRepository.findBySerialNo(patientDataDto.serialNo()).isPresent()) {
            throw new AlreadyExistsException("Patient data already exists for serial no. : " + patientDataDto.serialNo());
        }

        PatientData patientData = new PatientData(
                patientDataDto.serialNo(),
                1,
                patientDataDto.clinic(),
                patientDataDto.disease(),
                patientDataDto.height_cm()
        );
        return patientDataRepository.save(patientData);
    }

    public PatientData updatePatientData(String sn, PatientDataDto patientDataDto) {
        PatientData patientData = patientDataRepository.findBySerialNo(sn)
                .orElseThrow(() -> new ResourceNotFoundException("Patient data with serial no. " + sn + " not found"));
        patientData.setSerialNo(patientDataDto.serialNo());
        if(patientDataDto.visitCount() != 0){
            patientData.setVisitCount(patientData.getVisitCount() + 1);
        } else {
            patientData.setVisitCount(patientDataDto.visitCount());
        }
        patientData.setClinic(patientDataDto.clinic());
        patientData.setDisease(patientDataDto.disease());
        patientData.setHeight_cm(patientDataDto.height_cm());

        return patientDataRepository.save(patientData);
    }

    public void deletePatient(String sn) {
        PatientData patientData = patientDataRepository.findBySerialNo(sn)
                .orElseThrow(() -> new ResourceNotFoundException("Patient data with serial no. " + sn + " not found"));
        patientDataRepository.delete(patientData);
    }

    public Page<PatientData> getAll(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return patientDataRepository.findAll(pageable);
    }
}
