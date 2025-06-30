package com.thp.mnudbsys.controller;

import com.thp.mnudbsys.dto.request.PatientDataDto;
import com.thp.mnudbsys.dto.response.ApiResponse;
import com.thp.mnudbsys.entity.Patient;
import com.thp.mnudbsys.entity.PatientData;
import com.thp.mnudbsys.service.impl.PatientDataServiceImpl;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Data
public class PatientDataController {
    private final PatientDataServiceImpl patientDataServiceImpl;

    @GetMapping("/getAllPatientData")
    public ResponseEntity<ApiResponse<Page<PatientData>>> getPatients(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize) {
        Page<PatientData> patientData = patientDataServiceImpl.getAll(pageNumber, pageSize);
        return ResponseEntity.ok(new ApiResponse<>(200, "Success", patientData));
    }

    @GetMapping("/getPatientData/{sn}")
    public ResponseEntity<ApiResponse<PatientData>> getAllPatientData(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @PathVariable String sn) {
        PatientData patientData = patientDataServiceImpl.getPatientData(sn);
        return ResponseEntity.ok(new ApiResponse<>(200, "Success", patientData));
    }

    @PostMapping("/addPatientData")
    public ResponseEntity<ApiResponse<PatientData>> setPatient(@RequestBody PatientDataDto patientDataDto){
        PatientData patientData = patientDataServiceImpl.setPatientData(patientDataDto);
        return ResponseEntity.ok(new ApiResponse<>(200, "Success", patientData));
    }

    @PutMapping("patientData/{sn}")
    public ResponseEntity<ApiResponse<PatientData>> updatePatientData(@PathVariable String sn, @RequestBody PatientDataDto patientDataDto){
        PatientData patientData = patientDataServiceImpl.updatePatientData(sn, patientDataDto);
        return ResponseEntity.ok(new ApiResponse(200, "Success", patientData));
    }

    @DeleteMapping("patientData/delete/{sn}")
    public ResponseEntity<Void> deletePatient(@PathVariable String sn){
        patientDataServiceImpl.deletePatient(sn);
        return ResponseEntity.noContent().build();
    }
}
