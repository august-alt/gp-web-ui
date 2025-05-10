# Project Summary
The project aims to develop a responsive web dashboard application using React and Shadcn UI components. The dashboard will feature various data visualizations, including stats cards, line charts, and traffic analytics, providing users with insights into key metrics such as views, visits, new users, and active users. The application will incorporate a dark mode theme and be designed for easy navigation.

# Project Module Description
The main functional modules of the dashboard include:
- **Stats Cards**: Display key metrics such as Views, Visits, New Users, and Active Users.
- **Charts**: Visual representations of data trends (line, bar, and pie charts).
- **Traffic Analytics**: Sections for analyzing website, device, and location traffic.
- **Navigation**: Sidebar and navbar for easy access to different sections.
- **Notifications Panel**: To alert users about important updates.

# Directory Tree
```
.
├── README.md                  # Project documentation
├── components.json            # Component configuration
├── eslint.config.js           # ESLint configuration
├── index.html                 # Main HTML file
├── package.json               # Project dependencies
├── package-lock.json          # Dependency lock file
├── public                     # Public assets
│   └── vite.svg               # Vite logo
├── src                        # Main source files
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components             # Dashboard components
│   │   └── dashboard
│   │    └── ...
|   ├── ui                     # Shadcn UI components
│   │    └── ...
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json          # TypeScript configuration
├── tsconfig.json              # TypeScript configuration
├── tsconfig.node.json         # Node TypeScript configuration
└── vite.config.ts             # Vite configuration
```

# File Description Inventory
- **README.md**: Contains project overview and setup instructions.
- **package.json**: Lists dependencies and scripts for the project.
- **src/**: Contains the main application source code, including components and styles.
- **public/**: Contains static assets like images and icons.
- **src/components/ui/**: Contains the Shadcn UI component library and its configurations.

# Technology Stack
- **React**: JavaScript library for building user interfaces.
- **Shadcn UI**: Component library for UI elements.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vite**: Build tool for faster development and hot module replacement.
- **TypeScript**: Superset of JavaScript for type safety.

# Usage
To get started with the project, follow these steps:
1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Run the application:
   ```bash
   npm run dev
   ```