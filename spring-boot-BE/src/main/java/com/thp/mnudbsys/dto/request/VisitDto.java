package com.thp.mnudbsys.dto.request;

import java.time.LocalDate;

public record VisitDto(
        String serialNo,
        LocalDate date,
        double weight_kg,
        double weightCircumf,
        double bmi,
        String nutritionalConcerns,
        String other,
        String comments
) {
}
