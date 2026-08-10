# 𝕏 Twitter Clone

A modern, full-stack Twitter (𝕏) Clone built with **Next.js 16 (App Router)**, **React 19**, **Prisma v7**, **Tailwind CSS v4**, **Clerk Authentication**, and **UploadThing**.

![Twitter Clone Screenshot](./screencapture.png)

---

## ⚡ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router & Server Actions) |
| **Frontend Library** | [React 19](https://react.dev/) |
| **Authentication** | [Clerk](https://clerk.com/) |
| **Database & ORM** | [Neon PostgreSQL](https://neon.tech/) & [Prisma v7](https://www.prisma.io/) (with Driver Adapters) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/) |
| **File Uploads** | [UploadThing](https://uploadthing.com/) |
| **Theme System** | `next-themes` (Dark Mode & Light Mode support) |
| **Toast Notifications** | `react-hot-toast` |

---

## ✨ Features

- **🔐 Authentication & User Sync**: Secure user onboarding and login powered by Clerk with automated PostgreSQL database synchronization.
- **✍️ Post Creation & Image Uploads**: Share text posts with high-resolution image uploads powered by UploadThing.
- **❤️ Interactive Feed & Optimistic Likes**: Like & unlike posts instantly with optimistic UI state updates and real-time counter changes.
- **💬 Commenting System**: Expandable comment section per post, allowing users to comment and engage.
- **👤 Dynamic User Profiles**: Dedicated profile pages (`/profile/[username]`) with editable bio, location, website, avatar, follower/following counts, and tab views for user posts and liked posts.
- **🤝 Follow / Unfollow System**: Follow or unfollow users dynamically with real-time button states and a "Who to Follow" recommendation sidebar.
- **🔔 Notification System**: 
  - Real-time unread notification badge indicator on the navbar Bell icon.
  - Dedicated notification center tracking likes, comments, and new followers.
  - Automatic unread-to-read status marking.
- **🛡️ Strict Ownership & Authorization**: Smart permissions ensure delete controls only appear on posts authored by the logged-in user.
- **🌗 Dark / Light Mode**: Seamless theme switching with system preference support.
- **📱 Fully Responsive**: Custom mobile navigation drawer and responsive multi-column layout for desktop, tablet, and mobile devices.

---

## 📁 Project Structure

```text
nextjs-twitter-clone/
├── actions/                  # Next.js Server Actions (user, post, profile, notification)
├── app/                      # Next.js 16 App Router pages and API routes
│   ├── api/uploadthing/      # UploadThing endpoint handlers
│   ├── notifications/        # Notifications page
│   ├── profile/[username]/   # User profile routes
│   ├── globals.css           # Tailwind v4 configuration & design system
│   ├── layout.tsx            # Root layout with Clerk & Theme providers
│   └── page.tsx              # Home feed page
├── components/               # React UI components
│   ├── ui/                   # Shadcn UI primitive components
│   ├── CreatePost.tsx        # Post creation box with image upload
│   ├── DesktopNavbar.tsx     # Desktop navigation with unread badge
│   ├── MobileNavbar.tsx      # Mobile drawer navigation
│   ├── Navbar.tsx            # Sticky header container
│   ├── PostCard.tsx          # Feed item with likes, comments, delete dialog
│   ├── Sidebar.tsx           # User profile summary sidebar card
│   └── FollowerRecommendation.tsx # "Who to Follow" sidebar
├── lib/                      # Utilities and Prisma client instance
├── prisma/                   # Prisma v7 schema and configuration
│   ├── schema.prisma         # Database models (User, Post, Like, Comment, Follows, Notification)
│   └── prisma.config.ts      # Prisma v7 config
└── public/                   # Static assets & screenshots
```

---

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js**: `v20.19.0` or higher
- **npm** / **yarn** / **pnpm** / **bun**

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nextjs-twitter-clone.git
cd nextjs-twitter-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and configure the environment variables:

```env
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database Connection (Neon Postgres)
DATABASE_URL="postgresql://user:password@ep-sample-pooler.region.aws.neon.tech/neondb?sslmode=verify-full"

# UploadThing Credentials (Optional / Required for uploads)
UPLOADTHING_TOKEN=...
```

### 4. Setup Prisma Database

Generate the Prisma client and push the schema to your database:

```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🚀 Building for Production

To verify types and build the production bundle:

```bash
npm run build
npm run start
```

---

## 📄 License

This project is licensed under the MIT License.
