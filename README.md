# 🌐 CodeSphere

**CodeSphere** is a web-based online code editor IDE for writing and previewing **HTML**, **CSS**, and **JavaScript** code in real-time. It provides a seamless, beginner-friendly interface with essential features like **sign-up/sign-in**, **project saving**, and **project management**, making it a powerful tool for front-end developers and learners.

---

## Features

### Live Coding Playground
- Write **HTML**, **CSS**, and **JavaScript** code.
- See the live output instantly in a preview window.
- Syntax-highlighted editor powered by CodeMirror or Monaco (optional).

### Authentication
- User **signup and login** functionality.
- Secure session handling using JWT or sessions.

### Project Management
- **Save**, **edit**, and **delete** code projects.
- Projects stored in **MongoDB**, tied to the logged-in user.
- Default boilerplate code included for HTML/CSS/JS.

### Organized Code Structure
- RESTful API endpoints using Express.
- Modular backend and frontend folders for easy navigation.

---

## Future Improvements

We're actively improving CodeSphere and here's what's coming next:

-  **Language Support Expansion**
  - Add support for **C++, Java, Python**, etc., using language compilers or Docker-based containers.
  - Code execution and output display for backend languages.

-  **Download Code Projects**
  - Option to download saved projects as `.zip` files.

-  **Deploy Projects**
  - One-click deployment to static site hosting (like Netlify or GitHub Pages).

-  **Rich Text Editor / Markdown Support**
  - For adding notes alongside your code.

-  **Real-Time Collaboration**
  - Pair programming and live code sharing via sockets.

---

## 🛠️ Tech Stack

| Layer        | Tech                          |
|--------------|-------------------------------|
| **Frontend** | HTML, CSS, JavaScript, React |
| **Backend**  | Node.js, Express.js           |
| **Database** | MongoDB with Mongoose         |
| **Auth**     | JWT / Express Sessions        |
| **Versioning** | Git + GitHub                 |

---

## 📸 Screenshots

![Screenshot]()

---

## Local Setup Instructions

```bash
# Clone the repository
git clone https://github.com/jagrat-phugat/Code-Sphere.git
cd Code-Sphere

# Install dependencies
npm install

# Set up environment variables (.env)
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/CodeIDE
JWT_SECRET=your_jwt_secret

# Start the server
npm start

# Visit the app at:
http://localhost:3000
