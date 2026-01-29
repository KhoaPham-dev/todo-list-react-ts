# Todo List React + TypeScript

This is a simple Todo List application built with React and TypeScript, following the requirements and architecture design provided.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [How to Test](#how-to-test)
- [Environment Variables](#environment-variables)
- [Build Instructions](#build-instructions)

## Project Overview

This application allows users to:
- Add new todo items.
- View a list of all todo items.
- Mark todo items as complete or incomplete.
- Edit existing todo items.
- Delete todo items.
- Filter todo items by "All", "Active", or "Completed" status.
- Clear all completed todo items.
- Persist todo items and their status across browser sessions using Local Storage.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v18 or higher) installed.
- npm or yarn or pnpm package manager.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/KhoaPham-dev/todo-list-react-ts.git
    cd todo-list-react-ts
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

## How to Run

To run the application in development mode:

```bash
npm run dev
# or yarn dev
# or pnpm dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## How to Test

To run the unit tests:

```bash
npm run test
# or yarn test
# or pnpm test
```

## Environment Variables

This project does not currently require any specific environment variables. If any were needed in the future, they would be listed in `.env.example`.

## Build Instructions

To build the application for production:

```bash
npm run build
# or yarn build
# or pnpm build
```

This will create a `dist` directory with the optimized production build.