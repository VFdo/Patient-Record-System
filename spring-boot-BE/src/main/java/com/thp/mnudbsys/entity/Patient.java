package com.thp.mnudbsys.entity;

import com.thp.mnudbsys.common.DateFormats;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Patient extends Auditable{
    @NotBlank(message = "serial no. is required")
    private String serialNo;
    @NotBlank(message = "name is required")
    private String name;
    private Gender gender;
    private LocalDate dob;
    private long age;
    @NotBlank(message = "phone is required")
    private String phone;
    private String address;
}
