package com.thp.mnudbsys.service.impl;

import com.thp.mnudbsys.dto.request.VisitDto;
import com.thp.mnudbsys.entity.PatientData;
import com.thp.mnudbsys.entity.Visit;
import com.thp.mnudbsys.exception.ResourceNotFoundException;
import com.thp.mnudbsys.repository.PatientDataRepository;
import com.thp.mnudbsys.repository.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class VisitServiceImpl {
    private final VisitRepository visitRepository;
    private final PatientDataRepository patientDataRepository;
    public Page<Visit> getVisit(String sn, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return visitRepository.findBySerialNo(sn, pageable);
    }

    public Visit setVisit(VisitDto visitDto) {
        double bmi = 0;
        Optional<PatientData> data = patientDataRepository.findBySerialNo(visitDto.serialNo());
        if(data.isPresent()){
            double height_cm = data.get().getHeight_cm();
            double height_m = height_cm/100;
            bmi = visitDto.weight_kg() / (height_m * height_m);
        }


        Visit visit = new Visit(
                visitDto.serialNo(),
                visitDto.date(),
                visitDto.weight_kg(),
                visitDto.weightCircumf(),
                bmi,
                visitDto.nutritionalConcerns(),
                visitDto.other(),
                visitDto.comments()

        );
        return visitRepository.save(visit);
    }

    public Visit updateVisit(String id, VisitDto visitDto) {
        Visit visit = visitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visit with id " + id + " not found"));
        visit.setSerialNo(visitDto.serialNo());
        visit.setDate(visitDto.date());
        visit.setWeight_kg(visitDto.weight_kg());
        visit.setWeightCircumf(visitDto.weightCircumf());
        visit.setBmi(visitDto.bmi());
        visit.setNutritionConcerns(visitDto.nutritionalConcerns());
        visit.setOther(visitDto.other());
        visit.setComments(visitDto.comments());
        return visitRepository.save(visit);
    }

    public void deleteVisit(String id) {
        Visit visit = visitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visit with id " + id + " not found"));
        visitRepository.delete(visit);
    }

    public Page<Visit> getAll(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return visitRepository.findAll(pageable);
    }
}
