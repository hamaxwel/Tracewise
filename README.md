# 📦 TraceWise – Decentralized Product Journey Tracker

## 📝 Overview
**TraceWise** is a decentralized SaaS platform that empowers businesses to track and visualize the complete journey of their products through the supply chain. By leveraging blockchain technology, TraceWise ensures that every stage—whether it's raw material sourcing, production, or delivery—is securely logged and immutable. This transparency builds trust with consumers and partners by allowing them to easily verify a product's history via a simple QR scan.

---

## 🚀 Key Features
- 🔗 **Blockchain Logging**: Secure, immutable records of every product stage.
- 🛠️ **Journey Builder**: A user-friendly, drag-and-drop interface to define supply chain stages.
- 📊 **Visual Insights**: Real-time charts and analytics using Chart.js.
- 📷 **QR Code Generation**: Simple QR codes to verify product authenticity.
- 🔒 **Decentralized Trust**: Enhanced data integrity and security across the supply chain.

---

## 🛠 Tech Stack
### Frontend
- React + Vite + TailwindCSS  
- Routing: `react-router-dom`
- Drag & Drop: `react-beautiful-dnd`
- Icons: `lucide-react`
- QR Code: `qrcode.react`
- Charts: `chart.js`

### Backend
- Framework: FastAPI (Python)
- Database: PostgreSQL
- Architecture: REST API

---

## 📦 Getting Started
### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/tracewise.git
cd tracewise
```

### 2. Install Dependencies
#### Frontend
```bash
cd tracewise-frontend
npm install
```
If you face dependency errors, try:
```bash
npm install --legacy-peer-deps
```

#### Backend
Make sure you have Python and FastAPI installed. Then run:
```bash
cd tracewise-backend
pip install -r requirements.txt
```

### 3. Start the Frontend
```bash
npm run dev
```

### 4. Start the Backend
```bash
uvicorn main:app --reload
```

---

## 🧪 Development Notes
- Ensure PostgreSQL is running locally and the backend is connected.
- Use `.env` files to manage sensitive configs for both frontend and backend.
- All supply chain stage updates are recorded on the blockchain and can be verified via QR scan.

---

## 🌐 API Documentation
### Endpoints
- **GET** `/api/journey`: Fetch all journey stages.
- **POST** `/api/journey`: Create a new journey.
- **PUT** `/api/journey/{id}`: Update an existing journey.
- **DELETE** `/api/journey/{id}`: Delete a journey.

---

## 📘 License
This project is open-source and available under the MIT License.

---

## 👥 Contributing
We welcome contributions! If you have ideas for improvements or new features, feel free to open an issue or submit a pull request.

### Steps to Contribute
1. Fork the repository.
2. Create a new branch for your changes:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -am 'Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a new Pull Request.