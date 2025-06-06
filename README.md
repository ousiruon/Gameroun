# 🎮 Gameroun

> A modern web app that allows users to explore and discover video games by platform, genre, rating, etc... — featuring smooth UI animations and fast navigation. It also includes an option to generate three random games based on the selected console(s) and the user's mood.

• [Live Demo](https://gameroun.netlify.app/)

• [GitHub Repo](https://github.com/ousiruon/Gameroun)

---

## 📸 Screenshots

• [Gameroun Screenshots]

(https://gameroun.netlify.app/screenshots/gamerounLaptop.png)
(https://gameroun.netlify.app/screenshots/gamerounIpad.png)
(https://gameroun.netlify.app/screenshots/gamerounIphone.png)
(https://gameroun.netlify.app/screenshots/gamerounGTALaptop.png)
(https://gameroun.netlify.app/screenshots/gamerounGTAIpad.png)
(https://gameroun.netlify.app/screenshots/gamerounGTAIphone.png)
(https://gameroun.netlify.app/screenshots/gamerounRandomGame.png)

---

## 🔧 Features

- Browse games by platform, genre, or rating
- Generate three random games based on selected console(s) and user's mood
- Responsive design optimized for mobile and desktop
- Smooth page transitions using Framer Motion
- Global state management with Zustand
- Client-side routing with React Router
- Type-safe codebase using TypeScript

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Routing:** React Router
- **Deployment:** Netlify

---

## 🧠 Challenges I Faced

- **Complex State Sharing**: Needed to share filters and game data across multiple components.  
  **Solution**: Used Zustand to create a centralized store that keeps the UI state in sync efficiently.

- **Smooth Navigation Animations**: Ensuring transitions didn’t interfere with routing logic.  
  **Solution**: Integrated `AnimatePresence` from Framer Motion with route-based conditional rendering.

---

## 📁 Project Structure

```bash
src/
├── components/      # UI elements and reusable components
├── assets/          # Zustand state logic, the no preview image that was used for game cards and a component used to show a loading animation while retrieving data
├── App.tsx          # Main app component
├── main.tsx         # Entry point
```

---

## 🚀 Getting Started

To run the project locally:

```bash
git clone https://github.com/ousiruon/Gameroun.git
cd Gameroun
npm install
```

### 🔑 Add Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_KEY=your_rawg_api_key_here
```

> ⚠️ Make sure your variables are prefixed with `VITE_` for Vite to expose them to the frontend.

Then start the development server:

````bash
npm run dev
```bash
git clone https://github.com/ousiruon/Gameroun.git
cd Gameroun
npm install
npm run dev
````

---

## 📬 Contact

Made with ❤️ by [OusiRuon](https://github.com/ousiruon)
