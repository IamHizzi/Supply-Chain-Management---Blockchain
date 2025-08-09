# Blockchain-Based Transportation Management System for CPEC

## 📌 Overview
This project is a **Blockchain-Based Transportation Management System** designed for the **China-Pakistan Economic Corridor (CPEC)**. It aims to streamline cargo transportation by connecting consignors, consignees, and carriers through a secure, transparent, and efficient platform.  

Built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and integrated with **Ethereum blockchain**, the system ensures secure data management, real-time tracking, and automated processes for booking, dispatching, and billing consignments.

---

## 🎯 Purpose
The objective is to **automate and secure the transportation process**, addressing inefficiencies in Pakistan's logistics sector such as:
- Manual record-keeping
- Lack of transparency
- Poor track-and-trace capabilities  

By leveraging **blockchain technology**, the system ensures:
- Immutable records
- Decentralized data storage
- Enhanced trust among stakeholders

---

## ✨ Features
- **User Registration & Validation**: Register and authenticate consignors, consignees, carriers, and branch managers.  
- **Consignment Booking**: Book consignments with detailed inputs (source, destination, weight, taxes) and generate receipts.  
- **Real-Time Tracking**: GPS integration with Google Maps for accurate transit updates.  
- **Manifest & Vehicle Management**: Register manifests, vehicles, and drivers with validation through external APIs.  
- **Dispatch & Delivery**: Dispatch consignments, generate gate passes, and manage unloading with automated reports.  
- **Accounting & Billing**: Manage ledgers, daily cashback, and payment reports with secure transaction records.  
- **Blockchain Integration**: Ethereum-based secure, immutable transaction storage and smart contracts for automation.  
- **User-Friendly Interface**: Built with React.js for an interactive experience.  
- **Notifications**: Real-time Firebase-based alerts.  

---

## 🛠 Tech Stack
- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB, Ethereum Blockchain  
- **Blockchain Framework**: Truffle (Ethereum smart contracts)  
- **Notifications**: Firebase  
- **APIs**: External APIs for vehicle & driver validation, GPS tracking  
- **Other Tools**: Google Maps for route optimization, GPS devices for real-time tracking  

---

## 🏗 System Architecture
The system follows a **three-tier architecture**:

1. **Frontend (React.js)**: Handles UI and consignment tracking.  
2. **Backend (Node.js/Express.js)**: Business logic, API requests, blockchain interaction.  
3. **Database (MongoDB & Ethereum)**: MongoDB stores non-blockchain data; Ethereum stores immutable transaction records.

---

## 📦 Installation

### **Prerequisites**
- Node.js (v14+)
- MongoDB
- Truffle (Ethereum blockchain)
- MetaMask (Ethereum wallet)
- Firebase account
- GPS-enabled devices for tracking


🚀 Usage
Login as consignor, consignee, or branch manager.

Book Consignment by entering details (weight, source, destination).

Track Consignment in real-time via GPS & Google Maps.

Manage Records (vehicles, drivers, manifests).

Billing handled via blockchain-based ledger.

⛓ Blockchain Integration
Immutable Records: Consignment, manifests, and payments stored on Ethereum.

Smart Contracts: Automate booking validation, dispatch, and billing.

Decentralized Trust: Prevents data tampering and single-point failures.


📄 License
This project is licensed under the MIT License.

📚 References
Blockchain Feasibility Study: Tracing the Supply Chain

Ethereum Documentation

MongoDB Documentation

React.js Documentation

Express.js Documentation
