package com.thp.mnudbsys.dto.request;

import com.thp.mnudbsys.entity.Gender;

import java.time.LocalDate;

public record PatientDto(
        String serialNo,
        String name,
        Gender gender,
        LocalDate dob,
        String phone,
        String address
) {
}
