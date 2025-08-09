
Blockchain-Based Transportation Management System for CPEC
Overview
This project is a Blockchain-Based Transportation Management System designed for the China-Pakistan Economic Corridor (CPEC). It aims to streamline cargo transportation by connecting consignors, consignees, and carriers through a secure, transparent, and efficient platform. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and integrated with Ethereum blockchain, the system ensures secure data management, real-time tracking, and automated processes for booking, dispatching, and billing consignments.
Purpose
The objective is to automate and secure the transportation process, addressing inefficiencies in Pakistan's logistics sector, such as manual record-keeping, lack of transparency, and poor track-and-trace capabilities. By leveraging blockchain technology, the system ensures immutable records, decentralized data storage, and enhanced trust among stakeholders.
Features

User Registration and Validation: Register and authenticate consignors, consignees, carriers, and branch managers.
Consignment Booking: Book consignments with detailed inputs (e.g., source, destination, weight, taxes) and generate receipts.
Real-Time Tracking: Track consignments using GPS integration and Google Maps for accurate transit updates.
Manifest and Vehicle Management: Register manifests, vehicles, and drivers with validation through external APIs.
Dispatch and Delivery: Dispatch consignments, generate gate passes, and manage unloading with automated reports.
Accounting and Billing: Manage ledgers, daily cashback, and payment reports with secure transaction records.
Blockchain Integration: Utilize Ethereum for secure, immutable storage of transaction data and smart contracts for automated processes.
User-Friendly Interface: Built with React.js for an interactive and intuitive frontend experience.
Notifications: Integrated with Firebase for real-time notifications.

Tech Stack

Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB, Ethereum Blockchain
Blockchain Framework: Truffle (for Ethereum smart contracts)
Notifications: Firebase
APIs: External APIs for vehicle and driver validation, GPS tracking
Other Tools: Google Maps for route optimization, GPS devices for real-time tracking

System Architecture
The system follows a three-tier architecture:

Frontend (React.js): Handles user interactions, displays consignment details, and provides tracking interfaces.
Backend (Express.js/Node.js): Manages business logic, API requests, and communication with MongoDB and Ethereum blockchain.
Database (MongoDB & Ethereum): MongoDB stores non-blockchain data, while Ethereum ensures secure, decentralized transaction records.

Installation
Prerequisites

Node.js (v14 or higher)
MongoDB
Truffle (for Ethereum blockchain)
MetaMask (for Ethereum wallet integration)
Firebase account
GPS-enabled devices for tracking

Setup

Clone the Repository:
git clone https://github.com/your-username/cpec-transportation-system.git
cd cpec-transportation-system


Install Dependencies:
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install


Configure Environment Variables:Create a .env file in the backend directory with the following:
MONGODB_URI=your_mongodb_connection_string
ETHEREUM_PROVIDER_URL=your_ethereum_node_url
FIREBASE_CONFIG=your_firebase_config


Deploy Smart Contracts:
cd blockchain
truffle migrate --network <your_network>


Run the Application:
# Start the backend
cd backend
npm start

# Start the frontend
cd ../frontend
npm start


Access the Application:Open your browser and navigate to http://localhost:3000.


Usage

Login: Authenticate as a consignor, consignee, or branch manager using email and password.
Book Consignment: Enter consignment details (e.g., weight, source, destination) to schedule a shipment.
Track Consignment: Use the tracking feature to monitor the consignment's location in real-time.
Manage Records: Admins can register vehicles, drivers, and manifests, and generate reports.
Billing: View and clear payments through the ledger system, with transactions recorded on the blockchain.

Blockchain Integration
The system uses Ethereum for:

Immutable Records: Consignment details, manifests, and payments are stored on the blockchain for transparency.
Smart Contracts: Automate processes like booking validation, dispatch, and billing.
Decentralized Trust: Ensures no single point of failure and prevents unauthorized data tampering.

Testing
The project includes a comprehensive test plan with test cases for:

Login (TC-1)
Booking Consignments (TC-2)
Tracking Consignments (TC-3)
Registering Manifests (TC-4)
Registering Vehicles (TC-5)
Registering Drivers (TC-6)
Dispatching Consignments (TC-7)
Unloading Consignments (TC-8)
Clearing Payments (TC-9)

Run tests using:
cd backend
npm test

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.

License
This project is licensed under the MIT License.
References

Blockchain Feasibility Study: Tracing the Supply Chain
Ethereum Documentation
MongoDB Documentation
React.js Documentation
Express.js Documentation
