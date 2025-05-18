# 🛒 CodiGo-Space (v2) – Firebase eCommerce App

A clean, responsive tech store built with **React** and **Firebase**. Users can browse products, add them to their cart, and keep that cart saved across sessions — even after closing the tab. This version replaces Commerce.js with a custom Firebase setup, giving me full control of how the app works under the hood.

---

## 💡 What It Does

- ✅ Pulls products from a Firestore database
- 🛒 Users can add/remove items from their cart
- 🔁 Cart stays saved using Firestore + localStorage
- 🧼 Clean UI built with Material UI and React
- 📱 Mobile-friendly and responsive

---

## ⚙️ Tech Stack

- **React** – Frontend framework
- **Firebase Firestore** – Stores product and cart data
- **Material UI** – UI components and styling
- **React Router** – Page navigation
- **localStorage** – Cart session tracking

---

## 🔧 Why I Built This

Originally built this app using Commerce.js, but decided to rebuild the cart system from scratch using Firebase. That meant creating my own cart logic, syncing data to Firestore, and handling persistence — just like a real eCommerce backend.

This gave me more control, better understanding of data flow, and showed me how to solve problems like cart syncing, Firestore reads/writes, and state persistence the hard way — but the right way.

---

## 📁 Firestore Structure

- `products` – Each doc = one product (name, price, image, description)
- `carts` – Each doc = one user’s cart (items array with product data + quantity)

---

## 🛠️ Setup Instructions

1. Clone the repo
2. Run `npm install`
3. Add your Firebase config in `/config/firebase.js`
4. Run `npm start`

---

## 🚧 Still In Progress

- Add-to-cart button on product cards
- Checkout page (coming soon)
- Cart context to sync count sitewide
- Optional: Add auth or Stripe later

---

## 🙋‍♂️ About Me

Built by Wes, a self-taught Full Stack Software Engineer with a background in psychology, bootcamp-certified, and committed to building things that work — and scale.

> “I’m not just learning how to code. I’m learning how to solve real problems with code.”

---

## ✅ Live Demo

Coming soon...