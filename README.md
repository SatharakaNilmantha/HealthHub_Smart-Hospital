<p align="center">
  <img src="https://github.com/user-attachments/assets/bff7ed00-b9f1-4a6c-8c7e-fbc7bae198b0" alt="HELTHHUB Logo" width="180"/>
</p>

<h1 align="center">🏥 HELTHHUB MEDICAL CENTER</h1>

<p align="center">
  <strong>A Full-Stack Smart Hospital Management System</strong><br/>
  Digitizing hospital operations for Admins, Doctors, Patients, and Front Desk staff.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/SpringBoot-2.7-green?style=flat-square&logo=springboot" />
  <img src="https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/MySQL-8.0-orange?style=flat-square&logo=mysql" />
  <img src="https://img.shields.io/badge/Java-1.8-red?style=flat-square&logo=java" />
  <img src="https://img.shields.io/badge/License-Academic-blueviolet?style=flat-square" />
</p>

---

## 🌟 Overview

**HELTHHUB MEDICAL CENTER** is a smart and scalable Hospital Management System (HMS) developed to digitize the core operations of a hospital. The platform offers a role-based interface with specialized dashboards and tools for **Admins**, **Doctors**, **Patients**, and **Receptionists (Front Desk Staff)**.

> The application streamlines appointments, test reports, prescriptions, user authentication, and hospital staff coordination through an intuitive and responsive interface.

---

## 🎯 Objectives

- Streamline daily hospital workflows digitally
- Securely store and manage medical records
- Provide role-based access and operations
- Improve communication among patients and staff
- Centralize reporting and analytics

---

## 🚀 Features

### 👩‍⚕️ Patient
- Register & login
- Book/view appointments
- Manage personal profile

### 👨‍⚕️ Doctor
- View and manage appointments
- Diagnose and prescribe

### 🧑‍💼 Receptionist
- View doctor information (name, department, availability)
- Share doctor’s prescription and diagnosis with the relevant patient


### 🧑‍💼 Admin
- Manage hospital staff and doctors
- View real-time statistics
- Book & reschedule appointments
- Monitor system logs and performance
- Full CRUD operations for all modules

---

## ⚙️ Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Frontend     | React.js (modular apps per role) |
| Backend      | Spring Boot (RESTful API) |
| Database     | MySQL (relational schema) |
| UI/Styling   | HTML5, CSS3, Bootstrap |
| Java Version | JDK 1.8             |
| API Format   | JSON over HTTP      |

---

## 🗂️ Project Structure

```

Smart-Hospital/
├── Smart-Hospital-back-end/         # Spring Boot backend
├── Smart-Hospital-front-end/
│   ├── AdminInterface/              # Admin role React app
│   ├── DoctorInterface/             # Doctor role React app
│   ├── FrontDeskInterface/          # Front desk role React app
│   └── PatientInterface/            # Patient role React app
└── README.md

````

---

## 📊 Diagrams

### 📌 ER Diagram
Shows table relationships in the hospital database  
![ER Diagram](https://github.com/user-attachments/assets/a7f2089d-04f6-47f8-b6cd-9f2d119e1734)


### 📌 Use Case Diagram  
Represents interactions between users and the system  
<p align="center"><img src="https://github.com/user-attachments/assets/57af8f12-7763-4046-b02c-26d55dcb0536" alt="Use Case Diagram" width="400"/></p>



---

## 🖼️ Screenshots

<table>
  <tr>
    <th>Patient Interface</th>
    <th>Admin Interface</th>
    <th>Doctor Interface</th>
    <th>Reception Interface</th>
  </tr>
  <tr>
    <td valign="top">
      <img src="https://github.com/user-attachments/assets/9a0e2cd6-f78b-42cb-9524-5e0696f101e5" alt="Home" width="100%" />
    </td>
    <td valign="top">
      <img src="https://github.com/user-attachments/assets/5c3cfd01-fa6c-4dbf-81f8-ef41e18012c4" alt="Admin Interface" width="100%" />
    </td>
    <td valign="top">
      <img src="https://github.com/user-attachments/assets/03a77fa4-8101-4e1f-bf33-a0666ae6db4e" alt="Admin Interface" width="100%" />
    </td>
    <td valign="top">
      <img src="https://github.com/user-attachments/assets/c6077e59-24c8-4e33-a44f-3aea7d7789bc" alt="Reception Interface" width="100%" />
    </td>
    
  </tr>
</table>

---

## 🚀 Installation

Follow these steps to install and set up the project:

### 1️⃣ Clone the repository
   ```bash
   git clone https://github.com/SatharakaNilmantha/HealthHub_Smart-Hospital.git
   cd HealthHub_Smart-Hospital
   ```

### 2️⃣ Backend (Spring Boot)
```bash
cd Smart-Hospital-back-end
# Open in your IDE (IntelliJ/Eclipse) and run the Spring Boot application
````

### 3️⃣ Frontend (React Apps)

Repeat for each interface:

```bash
cd Smart-Hospital-front-end/ROLE_Interface
npm install
npm start
```

> Replace `ROLE_Interface` with one of:
>
> * AdminInterface
> * DoctorInterface
> * FrontDeskInterface
> * PatientInterface

---
<h2 style="text-align: center;">📚 Roles & Contributors</h2>

<div align="center">
<table>
<!-- Row 1 -->
<tr>
<!-- Member 1 -->
<td align="center">
<img src="https://github.com/user-attachments/assets/7ab5529c-7fba-437a-9c16-e5b1db3fdb71" width="140" height="140" style="border-radius: 50%; object-fit: cover;" alt="WIJESURIYA P.D.D.N." />
<br/>
<small><strong>WIJESURIYA P.D.D.N.</strong></small><br/>
<small>Project Manager (PM)</small>
<br/>
<a href="https://github.com/didula08" target="_blank" rel="noopener noreferrer">
<img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="24" height="24" alt="GitHub"/>
</a>
</td>

<!-- Member 2 -->
<td align="center">
<img src="https://github.com/user-attachments/assets/e6b06138-e16f-463e-861a-d14d2d5832d3" width="140" height="140" style="border-radius: 50%; object-fit: cover;" alt="WICKRAMARATHNE W.G.G.Y." />
<br/>
<small><strong>WICKRAMARATHNE W.G.G.Y.</strong></small><br/>
<small>Frontend Developer</small>
<br/>
<a href="https://github.com/GeethmaYasashwi" target="_blank" rel="noopener noreferrer">
<img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="24" height="24" alt="GitHub"/>
</a>
</td>

<!-- Member 3 -->
<td align="center">
<img src="https://github.com/user-attachments/assets/50d6bae8-2d59-448a-814d-b4c6a4c0bfa1" width="140" height="140" style="border-radius: 50%; object-fit: cover;" alt="DE MEL L.M.N.H." />
<br/>
<small><strong>DE MEL L.M.N.H.</strong></small><br/>
<small>Backend Developer</small>
<br/>
<a href="https://github.com/nemasha-demel" target="_blank" rel="noopener noreferrer">
<img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="24" height="24" alt="GitHub"/>
</a>
</td>
</tr>

<!-- Row 2 -->
<tr>
<!-- Member 4 -->
<td align="center">
<img src="https://github.com/user-attachments/assets/96b136ba-bd55-462c-b4f0-b2a442eb44d7"
 width="140" height="140" style="border-radius: 50%; object-fit: cover;" alt="GUNARATHNA A.M.S.N." />
<br/>
<small><strong>GUNARATHNA A.M.S.N.</strong></small><br/>
<small>UI/UX Designer & QA</small>
<br/>
<a href="https://github.com/SatharakaNilmantha" target="_blank" rel="noopener noreferrer">
<img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="24" height="24" alt="GitHub"/>
</a>
</td>

<!-- Member 5 -->
<td align="center">
<img src="https://github.com/user-attachments/assets/dfec3726-3b15-4d60-bfba-dec3b72c0dc8" width="140" height="140" style="border-radius: 50%; object-fit: cover;" alt="DE SILVA G.A.S." />
<br/>
<small><strong>DE SILVA G.A.S.</strong></small><br/>
<small>Documentation & RA</small>
<br/>
<a href="https://github.com/Ashansanjana" target="_blank" rel="noopener noreferrer">
<img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="24" height="24" alt="GitHub"/>
</a>
</td>
</tr> </table>
</div>

---

## 📘 Academic Details

> This project was developed as part of the **Semester 06 software Engineering Web Development Project** , showcasing full-stack development and real-world system design in a healthcare domain.

---

## 🤝 Contributing

We welcome academic collaboration. To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

---

## 🔐 License

This project is licensed for **educational and academic purposes only**. Unauthorized commercial use is strictly prohibited.

---

## 🙏 Acknowledgements

Special thanks to our mentors and faculty for their invaluable support and guidance throughout the development of HELTHHUB Medical Center.

>*Built with ❤️ for a better and smarter healthcare system.*
>***💡 If you like this project, don't forget to give it a ⭐ on GitHub! 😊***


