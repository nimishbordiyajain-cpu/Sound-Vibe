# SoundVibe - End Semester React Project

SoundVibe is a modern, premium music streaming application built as an End Semester B.Tech Project. It strictly follows the "SoundVibe" problem statement, featuring a persistent bottom player, seamless album browser, and timeline update shield, while also integrating advanced features like authentication, premium subscriptions, and an AI Smart Assistant.

## 🚀 Features Implemented

### Problem Statement Features (SoundVibe)
*   **Permanent Music Bar:** A player control panel that sticks to the bottom.
*   **Navigation Menu:** A responsive left sidebar.
*   **Track List Builder & Playlist Hub:** Add songs to queue and custom playlists.
*   **On-Demand Queue Editor:** A slide-out panel to view and reorder upcoming tracks.
*   **Seamless Album Browser:** A smooth scrolling list built to handle large collections without stuttering.
*   **Timeline Update Shield:** Uses `React.memo` and local state separation to prevent the entire UI from needlessly re-rendering every second.
*   **Auto-Play Manager:** Automatically triggers the next song when the current track ends.

### General & Extra Features
*   **Authentication Flow:** Login, Register, and Forgot Password UI with protected routes.
*   **Subscription System:** Beautiful pricing cards with monthly/yearly billing toggle.
*   **Payment Simulation:** Mock Razorpay portal with Card, UPI, Net Banking, and Wallet options.
*   **AI Smart Assistant:** A floating chat DJ that helps users find music based on their vibe.
*   **Modern UI/UX:** Built with Tailwind CSS and Framer Motion for smooth animations, dark mode, gradients, and toast notifications.

## 📁 Folder Structure

*   `src/components/auth/`: Login and registration flow
*   `src/components/layout/`: Sidebar, MainLayout, ProtectedRoute
*   `src/components/player/`: BottomPlayer and QueuePanel
*   `src/components/library/`: SongRow with React.memo for Timeline Shield
*   `src/components/premium/`: Subscription and Razorpay simulation
*   `src/context/`: AuthContext and PlayerContext

## 🛠 Technologies Used
*   React 18 & Vite
*   React Router DOM (Routing)
*   Tailwind CSS (Styling)
*   Lucide React (Icons)
*   Framer Motion (Animations)
*   React Hot Toast (Notifications)

## 🏃‍♂️ How to Run Locally

1.  Clone this repository or download the folder.
2.  Open a terminal in the project root folder.
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Open `http://localhost:5173` in your browser.
