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
> Shows table relationships in the hospital database  
![ER Diagram](https://github.com/user-attachments/assets/a7f2089d-04f6-47f8-b6cd-9f2d119e1734)


### 📌 Use Case Diagram  
> Represents interactions between users and the system  
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

## 🧪 Installation

### 1️⃣ Backend (Spring Boot)
```bash
cd Smart-Hospital-back-end
# Open in your IDE (IntelliJ/Eclipse) and run the Spring Boot application
````

### 2️⃣ Frontend (React Apps)

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

## 📚 Roles & Contributors

| Project Manager (PM) | Frontend Developer | Backend Developer | UI/UX Designer & QA | Documentation & Research Assistant |
|----------------------|--------------------|-------------------|---------------------|------------------------------------|
| <img src="https://github.com/user-attachments/assets/e5d17e91-c865-4411-b6a2-754f5e58c30e" width="100" height="100" style="border-radius: 50%;"><br>**WIJESURIYA P.D.D.N.**<br>Project Manager (PM)<br>[GitHub](https://github.com/didula08) | <img src="https://github.com/user-attachments/assets/8c808eed-a500-4c1f-889e-a7ba73bddc8f" width="100" height="100" style="border-radius: 50%;"><br>**WICKRAMARATHNE W.G.G.Y.**<br>Frontend Developer<br>[GitHub](https://github.com/GeethmaYasashwi) | <img src="https://github.com/user-attachments/assets/f56f4185-bf38-430f-9e75-12e2a55d267a" width="100" height="100" style="border-radius: 50%;"><br>**DE MEL L.M.N.H.**<br>Backend Developer<br>[GitHub](https://github.com/nemasha-deme) | <img src="https://github.com/user-attachments/assets/6e96b6c6-843b-473e-a828-662d4a5dd9a3" width="100" height="100" style="border-radius: 50%;"><br>**GUNARATHNA A.M.S.N.**<br>UI/UX Designer & QA<br>[GitHub](https://github.com/SatharakaNilmantha) | <img src="https://github.com/user-attachments/assets/49f70df2-1a6f-4cda-892a-989a3d74530c" width="100" height="100" style="border-radius: 50%;"><br>**DE SILVA G.A.S.**<br>Documentation & Research Assistant<br>[GitHub](https://github.com/Ashansanjana) |

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

> *Built with ❤️ for a better and smarter healthcare system.*

```

---

Let me know if you want this as a downloadable `README.md` file or if you’d like to include screenshots or video demos for the interfaces.
```
