# Little Lemon Restaurant Web Application 

A fully responsive web application built for the **Meta Front-End Developer Capstone Project**. Little Lemon is a family-owned Mediterranean restaurant based in Chicago, featuring online table reservations, dynamic time slots, robust form validation, and full accessibility compliance.

---

##  Features Implemented

- **Interactive Homepage:** Features a hero section, specials menu with interactive cards, customer testimonials, and restaurant history (Chicago section).
- **Table Reservation System (`/booking`):**
  - **Multi-Step Booking Flow:** Structured cleanly into Reservation Details and Personal Contact Information with browser autofill support.
  - **Dynamic Time Slots:** Uses a reducer and mock API (`fetchAPI`) to generate available booking times based on the selected date.
  - **Conflict Prevention:** Checks `localStorage` in real-time to prevent double-booking the same date and time slot.
  - **Current Reservations Table:** Displays all active bookings stored in browser `localStorage`.
- **Client-Side Validation:** HTML5 attributes (`required`, `min`, `max`) combined with React state validation to enable/disable the submit button dynamically.
- **Accessibility (A11y):** Built with semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`), explicit form labels via `htmlFor`, and required ARIA attributes (`aria-label="On Click"`).
- **Automated Unit Tests:** Comprehensive Jest & React Testing Library test suite verifying reducers, LocalStorage operations, form validation, and DOM rendering.

---

##  Built With

- **React** (v18) & **React Router** (v6)
- **JavaScript (ES6+)**
- **HTML5 & CSS3** (Custom responsive layout & Figma-inspired design system)
- **Jest & React Testing Library** for automated testing

---

##  Installation & Setup Instructions

To run this project locally on your machine, follow these steps:

### Prerequisites
Make sure you have **Node.js** and **npm** installed on your computer.

### 1. Clone the Repository
```bash
git clone [https://github.com/alshargabisama/little-lemon.git](https://github.com/alshargabisama/little-lemon.git)
cd little-lemon
