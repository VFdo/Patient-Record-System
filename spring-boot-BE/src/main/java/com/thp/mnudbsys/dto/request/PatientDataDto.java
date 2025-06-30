package com.thp.mnudbsys.dto.request;

public record PatientDataDto(
        String serialNo,
        int visitCount,
        String clinic,
        String disease,
        double height_cm
) {
}
