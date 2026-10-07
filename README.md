<div align="center">

# 🛍️ QuickList

**A hyperlocal marketplace for small and home businesses.**
List products, reach nearby buyers, and connect on WhatsApp — no middlemen, no platform fees.

![Expo](https://img.shields.io/badge/Expo-SDK%2057-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-TypeScript-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20FCM-FFCA28?logo=firebase&logoColor=black)
![Status](https://img.shields.io/badge/status-v1.0%20released-brightgreen)

[📥 Download APK](https://github.com/omkarwarik02/<repo-name>/releases/latest/download/QuickList.apk) · [🎬 Demo video](<demo-video-link>) · [📦 All releases](https://github.com/omkarwarik02/<repo-name>/releases)

</div>

---

## 📖 About

Home bakers, local artisans, and small shop owners often sell through WhatsApp groups and word of mouth. **QuickList** gives them a simple storefront that only shows their products to buyers **nearby**, so every listing reaches people who can actually pick it up.

Sellers post a product with their WhatsApp number. Buyers browse what's close to them and tap **Contact Seller** to start a WhatsApp chat instantly. Payment and handover happen offline, directly between buyer and seller. QuickList only handles discovery.

## 📥 Try the app (Android)

1. On your Android phone, download **`QuickList.apk`** from the [latest release](https://github.com/omkarwarik02/<repo-name>/releases/latest).
2. Open the file. If Android asks, allow your browser or file manager to **Install unknown apps**.
3. If Google Play Protect warns about the app, tap **More details → Install anyway**. The app isn't on the Play Store yet.
4. Open QuickList and sign in with Google. Allow **location** and **notifications** when asked.

> ⏳ **The first load can take up to a minute.** The backend runs on a free hosting tier that sleeps when idle. After it wakes up, the app is fast.
>
> The APK is ~112 MB and works on Android only.

## ✨ Features

- 🔐 **Google Sign-In** with Firebase Authentication, and one account with a Buyer/Seller mode toggle
- 📦 **Create listings** with title, photos, description, price, location, and a seller WhatsApp number
- 📋 **My Listings** to manage your active and closed listings
- 📍 **Zap (nearby mode)** shows listings around your current location, using MongoDB geospatial queries
- 🔎 **Search and category filters** on the feed
- ♾️ **Infinite scroll** with server-side pagination
- 💬 **Contact Seller** opens a WhatsApp chat with the seller instantly and saves the listing to your **Interests** tab
- ❤️ **Like** a listing to bookmark it
- 🔔 **Push notifications** when a new listing is posted near you, plus an **in-app notifications** screen with an unread badge on the bell

## 🧠 Engineering highlights

| Area | What was done |
|------|---------------|
| **Nearby search** | Listings store a GeoJSON `Point` with a `2dsphere` index; `$near` + `$maxDistance` returns results sorted nearest-first. Coordinates are stored as `[longitude, latitude]`. |
| **Pagination** | `page` / `limit` (capped at 50) with a `limit + 1` fetch to compute `hasMore` without a second count query. The client hook uses refs to block duplicate and concurrent requests, and de-duplicates items. |
| **Query speed** | Mongoose `.lean()` on read-only endpoints cut feed query time by ~27% (64 ms → 47 ms on 500 listings). A compound index on `{ status, createdAt }` supports the main feed query. |
| **Notifications** | When a listing is created, the backend finds users within 10 km (excluding the seller), stores in-app notifications, and sends push messages through Expo Push to Firebase Cloud Messaging in batches of 100. Failures are logged, not thrown, so listing creation never breaks. |
| **Build size** | Release APK reduced from 228 MB to ~112 MB by building arm64-only and enabling R8 minification and resource shrinking. |

## 🧱 Tech Stack

| Layer          | Technology                                         |
|----------------|----------------------------------------------------|
| Mobile App     | React Native, Expo SDK 57, TypeScript, NativeWind, expo-router |
| Auth           | Firebase Authentication (Google Sign-In)           |
| Backend        | Node.js, Express, TypeScript                       |
| Database       | MongoDB (Mongoose), 2dsphere geospatial index      |
| Notifications  | Expo Push, Firebase Cloud Messaging                |
| Hosting        | Render (backend), local Gradle release build (APK) |

## 🏗️ Architecture

```
┌────────────────────┐        ┌──────────────────────┐
│  QuickList App     │  REST  │  Express API (TS)    │
│  (Expo / RN)       │◄──────►│  hosted on Render    │
│                    │        │                      │
│  Firebase Auth ────┼──ID────►  • Verifies Firebase │
│  (Google Sign-In)  │ token  │    ID tokens         │
│                    │        │  • Listings, users,  │
│  Push token ───────┼───────►│    notifications     │
│                    │        │  • $near geo queries │
└─────────▲──────────┘        └──────────┬───────────┘
          │                              │
          │ push                  ┌──────▼──────┐
          │                       │   MongoDB   │
   ┌──────┴───────┐               └─────────────┘
   │ FCM ◄─ Expo  │◄── new listing → notify nearby users
   │      Push    │
   └──────────────┘
```

## 📁 Project Structure

```
quicklist/
├── app/ (or quicklist-app)      # Expo mobile app
│   ├── app/                     # Screens (expo-router), incl. notifications screen
│   ├── components/              # Reusable UI (TopBar with notification bell)
│   ├── hooks/                   # useAllListings, useNearByListing (paginated)
│   └── config/                  # API base URL, Firebase config
└── server/ (or quicklist-backend)  # Express backend
    └── src/
        ├── models/              # Mongoose schemas (User, Listing, UserNotification)
        ├── controllers/         # Listings, auth, notifications
        ├── routes/              # API routes
        ├── middleware/          # Firebase token verification
        └── utils/               # notifyNearbyUsers (Expo Push)
```

## 🗺️ Roadmap

- [x] Landing page and Google login flow
- [x] Unified buyer/seller account with mode toggle
- [x] Create listing with photos and location
- [x] My Listings
- [x] Nearby listings feed (geospatial)
- [x] Contact Seller via WhatsApp, Interests tab, and Like
- [x] Pagination and infinite scroll
- [x] Push and in-app notifications
- [ ] Server-side search and category filtering
- [ ] Cursor-based pagination
- [ ] Phase 2: live bidding with Socket.IO
- [ ] Phase 2: buyer–seller agreement
- [ ] Play Store release

> 💡 **No in-app payments by design.** QuickList handles discovery and contact only. Payment is settled offline between buyer and seller.

## 📸 Screenshots

| Home feed | Zap (nearby) | Create Listing | Notifications |
|:---------:|:------------:|:--------------:|:-------------:|
| _add screenshot_ | _add screenshot_ | _add screenshot_ | _add screenshot_ |

## 👤 Author

**Omkar Warik**
- GitHub: [@omkarwarik02](https://github.com/omkarwarik02)

## 📄 License

This project is licensed under the MIT License.
