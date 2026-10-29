# 🚨 Ops Board

A lightweight incident management dashboard built with React. Ops Board allows users to monitor operational incidents, create new records, update incident statuses, and delete incidents through a simple API.

## ✨ Features

- 📋 **Incident Monitoring** — Fetch and display incidents from the server.
- ➕ **Create Incidents** — Add incidents with a title, severity, and status.
- 🔄 **Update Status** — Change incident statuses without refreshing the page.
- 🗑️ **Delete Incidents** — Remove incidents with a confirmation prompt.
- ⚡ **Loading & Error States** — Provide feedback while API requests are processing or when they fail.
- 🎨 **Dark UI** — Responsive interface styled with Tailwind CSS.
- 🧩 **Service Layer** — Keep API communication separate from React components.

## 🛠️ Tech Stack

- **React** — User interface
- **Vite** — Development server and build tool
- **JavaScript** — Application logic
- **Tailwind CSS v3** — Styling
- **Axios** — HTTP requests
- **JSON Server** — Local development API

## 📦 Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm.

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd ops-board
```

Replace `<your-repository-url>` with your GitHub repository URL.

### 2. Install dependencies

```bash
npm install
```

If the required packages are not already listed in `package.json`, install them:

```bash
npm install axios
npm install -D tailwindcss@3.4.17 postcss autoprefixer json-server
```

### 3. Prepare the database file

Create a `db.json` file in the project root:

```json
{
  "incidents": [
    {
      "id": "1",
      "title": "Database connection failure",
      "severity": "critical",
      "status": "open",
      "timestamp": "2026-10-29T09:15:00.000Z"
    },
    {
      "id": "2",
      "title": "API latency spike",
      "severity": "medium",
      "status": "investigating",
      "timestamp": "2026-10-29T09:30:00.000Z"
    }
  ]
}
```

This sample data lets you test the dashboard. JSON Server reads and updates the local file when incidents are created, modified, or deleted.

### 4. Configure JSON Server

Ensure that `package.json` contains the following script in its existing `scripts` section:

```json
"server": "json-server -p 3001 db.json"
```

Keep your existing scripts, including `dev` and `build`.

### 5. Start the backend

Open a terminal in the project root and run:

```bash
npm run server
```

The API will be available at:

`http://localhost:3001/incidents`

### 6. Start the frontend

Open a second terminal in the project root and run:

```bash
npm run dev
```

Open the local URL displayed by Vite.

## 🔌 API Operations

Ops Board uses Axios to communicate with JSON Server.

| Action | HTTP Method | Endpoint |
|---|---|---|
| Fetch incidents | GET | `/incidents` |
| Create an incident | POST | `/incidents` |
| Update incident status | PATCH | `/incidents/:id` |
| Delete an incident | DELETE | `/incidents/:id` |

The API service module is located at `src/services/incidents.js`.

## 📁 Project Structure

```text
ops-board/
├── db.json
├── src/
│   ├── components/
│   │   ├── IncidentForm.jsx
│   │   └── IncidentList.jsx
│   ├── services/
│   │   └── incidents.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

The exact structure may evolve as the project grows.

## 🏗️ Production Build

To check whether the frontend compiles successfully, run:

```bash
npm run build
```

Vite generates the production files in the `dist/` directory.

## ⚠️ Deployment Notes

This project currently uses JSON Server and a local `db.json` file for development.

The API address `http://localhost:3001` only works on the computer running JSON Server. To deploy the frontend, configure an accessible hosted API and update the API base URL accordingly.

JSON Server is used as a learning backend and is not intended to serve as the production database for a real incident management system.

## 🧠 What I Learned

- React components, props, and state management
- `useState` and `useEffect`
- Controlled forms and event handling
- Asynchronous JavaScript and Promises
- REST-style API communication
- HTTP methods: GET, POST, PATCH, and DELETE
- Axios service modules
- Loading, error, and empty states
- Updating React state after successful server operations
- Using npm scripts and managing project dependencies
- Styling responsive interfaces with Tailwind CSS

## 📌 Future Improvements

- Incident search and filtering
- Dashboard statistics and severity summaries
- Improved status and severity visualizations
- Pagination for larger incident lists
- Authentication and role-based access
- Integration with a production backend

## 📄 License

No license has been specified yet. Add a `LICENSE` file if you intend to make the project available for others to reuse.
