package com.thp.mnudbsys.entity;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PatientData extends Auditable{
//    @NotBlank(message = "patient serial no. is required")
    private String serialNo;
    private int visitCount;
    private String clinic;
    private String disease;
    private double height_cm;
}
