package com.thp.mnudbsys.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import java.time.LocalDate;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Visit extends Auditable{
    @NotBlank(message = "patient serial no. is required")
    private String serialNo;
    private LocalDate date;
    private double weight_kg;
    private double weightCircumf;
    private double bmi;
    @Lob
    private String nutritionConcerns;
    @Lob
    private String other;
    @Lob
    private String comments;
}
