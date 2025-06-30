package com.thp.mnudbsys.controller;

import com.thp.mnudbsys.dto.request.PatientDto;
import com.thp.mnudbsys.dto.response.ApiResponse;
import com.thp.mnudbsys.entity.Patient;
import com.thp.mnudbsys.service.impl.PatientServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class PatientController {
    private final PatientServiceImpl patientServiceImpl;

    @GetMapping("/getAllPatients")
    public ResponseEntity<ApiResponse<Page<Patient>>> getPatients(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize) {
        Page<Patient> patients = patientServiceImpl.getAll(pageNumber, pageSize);
        return ResponseEntity.ok(new ApiResponse<>(200, "Success", patients));
    }

    @GetMapping("/getPatientBySN/{sn}")
    public ResponseEntity<ApiResponse<Patient>> getPatientBySN(@PathVariable String sn){
        Patient patient = patientServiceImpl.getPatientBySn(sn);
        return ResponseEntity.ok(new ApiResponse<>(200, "Success", patient));
    }

    @GetMapping("/getPatientByPhone/{phone}")
    public ResponseEntity<ApiResponse<Patient>> getPatientByPhone(@PathVariable String phone){
        Patient patient = patientServiceImpl.getPatientByPhone(phone);
        return ResponseEntity.ok(new ApiResponse<>(200, "Success", patient));
    }

    @PostMapping("/addPatient")
    public ResponseEntity<ApiResponse<Patient>> setPatient(@RequestBody PatientDto patientDto){
        Patient patient = patientServiceImpl.setPatient(patientDto);
        return ResponseEntity.ok(new ApiResponse<>(200, "Success", patient));
    }

    @PutMapping("patient/{id}")
    public ResponseEntity<ApiResponse<Patient>> updatePatient(@PathVariable String id, @RequestBody PatientDto patientDto){
        Patient patient = patientServiceImpl.updatePatient(id, patientDto);
        return ResponseEntity.ok(new ApiResponse(200, "Success", patient));
    }

    @DeleteMapping("patient/delete/{sn}")
    public ResponseEntity<Void> deletePatient(@PathVariable String sn){
        patientServiceImpl.deletePatient(sn);
        return ResponseEntity.noContent().build();
    }





}
