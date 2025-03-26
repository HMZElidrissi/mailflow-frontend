# MailFlow

## Overview

The MailFlow Frontend is a modern web application built with React that provides a user-friendly interface for managing
email marketing campaigns. It allows users to create and manage contacts, build email campaigns with specific triggers,
and view analytics on email performance.

## Tech Stack

- **React**: UI library for building the component-based interface
- **TypeScript**: For type-safe code
- **Redux Toolkit**: For state management
- **React Router**: For navigation
- **TanStack Query (React Query)**: For data fetching, caching, and state management
- **React Hook Form**: For form handling with validation
- **Zod**: For schema validation
- **Tailwind CSS**: For styling components
- **shadcn/ui**: UI component library built on Tailwind CSS
- **Axios**: For API requests
- **Lucide React**: For icons
- **Recharts**: For data visualization

## Features

- **Authentication**: Login and user management
- **Dashboard**: Overview of key metrics and recent activity
- **Contacts Management**: Create, view, edit, and delete contacts
- **Contact Tagging**: Add and remove tags from contacts
- **Campaign Management**: Create, activate, and monitor email campaigns
- **Template Management**: Create and edit email templates
- **Email Sending**: Send emails to contacts and track performance

## Project Structure

```
src/
├── app.tsx                   # Main application component
├── components/               # Reusable UI components
│   ├── auth/                 # Authentication components
│   ├── dashboard/            # Dashboard components
│   ├── campaigns/            # Campaign-related components
│   ├── contacts/             # Contact-related components
│   ├── ui/                   # Shared UI components
│   └── ...
├── config/                   # Configuration files
├── features/                 # Redux slices and related logic
│   ├── auth/                 # Authentication state management
│   └── ...
├── hooks/                    # Custom React hooks
├── layouts/                  # Layout components
│   ├── dashboard-layout.tsx  # Main dashboard layout
│   └── main-layout.tsx       # Public pages layout
├── lib/                      # Utility functions
├── pages/                    # Page components
│   ├── auth/                 # Authentication pages
│   ├── contacts/             # Contact management pages
│   ├── dashboard/            # Dashboard pages
│   └── ...
├── services/                 # API service clients
│   ├── api.ts                # Base API client
│   ├── contactsApi.ts        # Contacts API client
│   ├── campaignsApi.ts       # Campaigns API client
│   └── ...
├── store/                    # Redux store configuration
├── types/                    # TypeScript type definitions
└── main.tsx                  # Application entry point
```

## Setup and Installation

### Prerequisites

- Node.js (v16+)
- pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/HMZElidrissi/mailflow-frontend.git
cd mailflow-frontend
```

2. Install dependencies

```bash
pnpm install
```

3. Create a `.env` file in the root directory with the following content: (the API_URL is the api gateway url)

```
VITE_API_URL=http://localhost:8222/api
```

4. Start the development server

```bash
pnpm dev
```

5. Open your browser and navigate to `http://localhost:5173`
