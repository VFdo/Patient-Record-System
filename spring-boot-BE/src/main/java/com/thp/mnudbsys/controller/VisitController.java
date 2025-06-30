package com.thp.mnudbsys.controller;

import com.thp.mnudbsys.dto.request.VisitDto;
import com.thp.mnudbsys.dto.response.ApiResponse;
import com.thp.mnudbsys.entity.PatientData;
import com.thp.mnudbsys.entity.Visit;
import com.thp.mnudbsys.service.impl.VisitServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class VisitController {
    private final VisitServiceImpl visitServiceImpl;

    @GetMapping("/getAllVisits")
    public ResponseEntity<ApiResponse<Page<Visit>>> getPatients(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize) {
        Page<Visit> visits = visitServiceImpl.getAll(pageNumber, pageSize);
        return ResponseEntity.ok(new ApiResponse<>(200, "Success", visits));
    }

    @GetMapping("/getVisits/{sn}")
    public ResponseEntity<ApiResponse<Page<Visit>>> getAllVisitsBySN(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @PathVariable String sn) {
        Page<Visit> visits = visitServiceImpl.getVisit(sn, pageNumber, pageSize);
        return ResponseEntity.ok(new ApiResponse<>(200, "Success", visits));
    }

    @PostMapping("/addVisit")
    public ResponseEntity<ApiResponse<Visit>> setVisit(@RequestBody VisitDto visitDto){
        Visit visit = visitServiceImpl.setVisit(visitDto);
        return ResponseEntity.ok(new ApiResponse<>(200, "Success", visit));
    }

    @PutMapping("visit/{id}")
    public ResponseEntity<ApiResponse<PatientData>> updatePatientData(@PathVariable String id,
                                                                      @RequestBody VisitDto visitDto){
        Visit visit = visitServiceImpl.updateVisit(id, visitDto);
        return ResponseEntity.ok(new ApiResponse(200, "Success", visit));
    }

    @DeleteMapping("visit/delete/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable String id){
        visitServiceImpl.deleteVisit(id);
        return ResponseEntity.noContent().build();
    }
}
