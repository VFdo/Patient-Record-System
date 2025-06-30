# MNUSys – A Patient Record Management System

A full-stack system designed for real-time patient visit logging and patient record management. Developed as an individual volunteer project.

## 🔧 Tech Stack

- **Backend**: Java (Spring Boot)
- **Frontend**: React.js (TypeScript, Fetch API)
- **Database**: PostgreSQL
- **Styling**: Material UI
- **APIs**: RESTful endpoints (Spring Boot controllers)

## ✨ Features

- Dynamic patient search by serial number (PHN)
- Real-time visit logging with validation
- Filter patient records based on medical conditions
- Tab-based UI for navigating patient and visit information

## 🚀 Getting Started

### Prerequisites
- Docker + Docker Compose

### Setup
From the `mnusys` folder: 
```bash
docker-compose up --build
```

### Backend Configuration (application.properties)
```env
spring.application.name=MNUDBSys

# PostgreSQL database configuration
spring.datasource.url=<DATABASE_URL>
spring.datasource.username=<DATABASE_USERNAME>
spring.datasource.password=<DATABASE_PASSWORD>
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA configurations
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true
```

### Frontend Configuration (appConfig.ts)
```env
export const baseURL = "<BACKEND_BASE_URL>";
export const phnURL = "<EXTERNAL_PATIENT_SEARCH_API>";
```

## 🖼️ Screenshots
<img width="1172" alt="Screenshot 2025-06-30 at 11 03 53" src="https://github.com/user-attachments/assets/3ac1383f-991b-43ff-b39d-fecd26447b23" />


## 📌 What I Learned

- Structuring modular UIs with React and Material UI
- Designing PostgreSQL schemas for efficient filtering and retrieval
- Working with healthcare-specific data validation and integration
- Deploying containerized full-stack apps with Docker Compose

## 📄 License
- This project is licensed under the MIT License.
