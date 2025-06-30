package com.thp.mnudbsys.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.thp.mnudbsys.common.DateFormats;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int refId;

    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DateFormats.LOCAL_DATE_TIME)
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DateFormats.LOCAL_DATE_TIME)
    private LocalDateTime lastModifiedDate;
}

