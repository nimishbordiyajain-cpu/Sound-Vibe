# 2.1 Project Title
**AudioX (formerly Sound-Vibe)** - A Premium Local Music Streaming Platform

# 2.2 Problem Statement
To design and develop a feature-rich music streaming application capable of managing and playing local audio files seamlessly. The application must provide a premium user interface with dynamic aesthetics, uninterrupted global state playback, custom playlist creation, user authentication, and advanced timeline scrubbing capabilities without relying on external streaming APIs.

# 2.3 Objectives
- Build a responsive, high-fidelity user interface utilizing Glassmorphism and micro-animations.
- Implement a custom HTML5 Audio engine to handle playback of local `.mp3` files.
- Ensure seamless music playback across different application routes (Dashboard, Library, Search) using Global State Management.
- Develop custom pointer-event logic for smooth timeline scrubbing and volume control.
- Implement timezone-aware dynamic dashboard interactions.

# 2.4 System Overview / Architecture
The system is built as a Single Page Application (SPA) using **React.js** and **Vite**.
- **Frontend Layer:** React components structured logically (`Dashboard`, `Sidebar`, `BottomPlayer`). Styled with modern Tailwind CSS utilities.
- **State Management:** React Context API (`PlayerContext`, `AuthContext`) acts as the single source of truth for global state (e.g., `isPlaying`, `currentTrack`, `volume`, `playlists`).
- **Routing:** React Router DOM manages navigation between views without full-page reloads, preserving audio playback state globally.
- **Media Engine:** HTML5 `<audio>` element bound to React refs for imperative control of media streams and metadata extraction.

# 2.5 Data Structures and Algorithms Used
- **Arrays & Objects:** Used extensively to model the track `library`, user `playlists`, and `likedSongs` within the Context state.
- **Filtering Algorithm:** A linear search algorithm `O(N)` is used in the Search view to dynamically filter tracks based on substrings of titles or artists.
- **Queue Management:** Array-based implementation of a queue data structure to robustly handle "Add to Queue", "Next", and "Previous" track functionalities.

# 2.6 Implementation Approach
- **Component-Driven Development:** The UI is broken down into modular, reusable components (e.g., `SongRow`, `BottomPlayer`).
- **Context API Decoupling:** Audio playback logic is completely decoupled from view components. This prevents unnecessary re-renders of the DOM and ensures the audio does not skip during page navigation.
- **Advanced Event Handling:** Utilized complex Pointer Events (`onPointerDown`, `onPointerMove`) and Pointer Capturing instead of basic native `<input type="range">` elements. This allows dragging playback timelines accurately even when the cursor leaves the bounding box of the element.
- **Dynamic Theming:** Implemented `Intl.DateTimeFormat` for strict timezone (IST) calculations to dynamically render UI greetings based on the user's specific local time.

# 2.7 Time and Space Complexity Analysis
- **Search Filtering:**
  - **Time Complexity:** `O(N * M)` where N is the number of songs and M is the length of the search query (string matching).
  - **Space Complexity:** `O(K)` where K is the number of matching songs stored in the temporary filtered array.
- **Playlist Management (Appending a song):**
  - **Time Complexity:** `O(1)` amortized for pushing to the playlist array.
  - **Space Complexity:** `O(1)` for the reference addition.
- **Audio State Updates:**
  - **Time Complexity:** `O(1)` for updating `currentTime` state via `timeupdate` events.

# 2.8 Execution Steps
1. Clone the repository: 
   ```bash
   git clone https://github.com/nimishbordiyajain-cpu/Sound-Vibe.git
   ```
2. Navigate to the project directory: 
   ```bash
   cd Sound-Vibe
   ```
3. Install dependencies: 
   ```bash
   npm install
   ```
4. Run the development server: 
   ```bash
   npm run dev
   ```
5. Open your browser and go to the local host address provided in the terminal (typically `http://localhost:5173`).

# 2.9 Sample Inputs and Outputs
- **Input:** Dragging an `.mp3` file into `public/songs/` and defining its object in `src/utils/dummyData.js`.
  - **Output:** The Dashboard dynamically renders the newly added song card with a playable interface.
- **Input:** Typing "Aashiq" into the Search bar.
  - **Output:** The Search view instantly filters the list `O(N)` to display "Aashiq Tera".
- **Input:** Clicking the "Heart" icon on a track.
  - **Output:** The track object is appended to the `likedSongs` array context, the icon turns green, and it appears in the Liked Songs view.

# 2.10 Screenshots
- <img width="1470" height="810" alt="image" src="https://github.com/user-attachments/assets/b53fdfe7-bc08-4262-9417-9e657daeb9df" />

- <img width="1470" height="812" alt="image" src="https://github.com/user-attachments/assets/e0c501b3-1ee4-4594-880d-916d17a5d0c8" />

- <img width="1470" height="811" alt="image" src="https://github.com/user-attachments/assets/d9129ce1-5784-40e5-868c-3c81da519f1b" />

# 2.11 Results and Observations
- **Performance:** The decoupling of the `PlayerContext` successfully resulted in uninterrupted music playback even during intense React Router DOM view switching.
- **UX:** The Pointer Capture implementation completely eliminated audio stuttering during timeline scrubbing, providing a perfectly smooth user experience.
- **Aesthetics:** Utilizing Glassmorphism (`backdrop-blur`) and Framer Motion (`animate`) significantly increased the perceived premium quality of the interface compared to standard flat designs.

# 2.12 Conclusion
The AudioX project successfully demonstrates the implementation of complex global state management and custom media engine integration within a React Single Page Application. It fulfills all requirements of the problem statement while drastically exceeding UI/UX baseline expectations through advanced frontend architecture and modern web design aesthetics.
