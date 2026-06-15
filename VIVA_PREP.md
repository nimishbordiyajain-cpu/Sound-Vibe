# SoundVibe - Viva Preparation Guide

This document contains highly probable questions your faculty might ask during your End Semester viva, along with simple, technically accurate answers based exactly on the code you submitted.

## React Core & Hooks
**1. What is React and why did you choose it for this project?**
React is a JavaScript library for building user interfaces. I chose it because of its component-based architecture, which allowed me to build reusable pieces like the `SongRow` and `BottomPlayer`, making the code clean and maintainable.

**2. What is Vite? Why not Create React App (CRA)?**
Vite is a modern build tool that is significantly faster than CRA. It uses native ES modules to serve code instantly during development, whereas CRA bundles the entire app before serving.

**3. Which React Hooks did you use in this project?**
I mainly used `useState` for managing local state (like input fields and toggles), `useEffect` for side effects (like the auto-play timer), `useContext` for global state (Auth and Player), and `React.memo` for performance optimization.

**4. Explain how you implemented the "Timeline Update Shield" requirement.**
To prevent the entire list of songs from re-rendering every second when the progress bar updates, I wrapped the `SongRow` component in `React.memo`. More importantly, I moved the `currentTime` state *out* of the global `PlayerContext` and kept it local inside the `BottomPlayer` component. This means only the bottom player re-renders every second, not the entire app.

**5. What is `useEffect` used for in your `BottomPlayer`?**
I used `useEffect` to create a `setInterval` that increments the `currentTime` every second while a song is playing. I also included a cleanup function `clearInterval` in the return statement to prevent memory leaks when the component unmounts or the song pauses.

## State Management & Context API
**6. Why did you use Context API instead of Redux?**
Since this project is relatively straightforward, Context API was sufficient to avoid "prop drilling" (passing props down multiple levels). Redux would have added unnecessary boilerplate and complexity for a 1st-year project.

**7. How does your Authentication flow work?**
I created an `AuthContext` that stores the `user` state. The `login` and `register` functions update this state and save the user data to `localStorage`. I then created a `ProtectedRoute` component that checks if `user` exists; if not, it redirects them to the login page using React Router's `<Navigate>`.

**8. How do you persist the user's login even after they refresh the page?**
In the `AuthContext`'s `useEffect`, I read from `localStorage.getItem('soundvibe_user')` when the app first loads. If data is found, I parse it and set it to the `user` state.

## Routing & UI
**9. How did you ensure the `BottomPlayer` and `Sidebar` stay permanently on the screen while navigating?**
I created a `MainLayout` component that contains the `Sidebar` and `BottomPlayer`. Inside the layout, I used the `<Outlet />` component from React Router. This allows the inner page content (like Dashboard or Premium) to change without unmounting or re-rendering the permanent layout components.

**10. What is Tailwind CSS and why use it over standard CSS?**
Tailwind is a utility-first CSS framework. Instead of writing separate CSS files, I apply pre-existing classes directly in the JSX (e.g., `flex items-center text-white`). It speeds up development and automatically handles things like dark mode and responsiveness.

**11. How does your mock Razorpay payment gateway work?**
The `PaymentModal` component manages local state for the selected payment method (Card, UPI, etc.). When the user clicks "Pay", it triggers a `setTimeout` to simulate network delay, updates the user's premium status in the context, and uses `useNavigate` to redirect to a receipt page.

## Component Specifics
**12. How does the "Auto-Play Manager" know when to play the next song?**
Inside the `BottomPlayer`'s `useEffect` interval, it checks if `currentTime >= duration`. If true, it calls the `handleNext()` function from the `PlayerContext` and resets `currentTime` to 0.

**13. What is `React.memo` and how does it help performance?**
`React.memo` is a higher-order component that prevents a component from re-rendering if its props have not changed. This was crucial for the Seamless Album Browser to prevent lag when the list of songs is very large.

*(Review your `AuthContext.jsx`, `PlayerContext.jsx`, and `MainLayout.jsx` files closely before your viva!)*
