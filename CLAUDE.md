# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Preview production build locally
npm run preview
```

## Architecture Overview

This is a React-based e-commerce admin panel built with Vite. The application uses a client-side only architecture with no backend API.

### Key Technologies
- React 19.1.0 with functional components and hooks
- Vite 7.0.0 for development and building
- React Router DOM 7.6.3 for client-side routing
- Tailwind CSS 4.1.11 for styling
- ESLint 9.29.0 for code quality

### Project Structure
- `src/pages/` - Page components (Login, Welcome, Users, Orders)
- `src/components/` - Reusable components (Layout, Sidebar)
- `src/contexts/` - React Context providers (AuthContext)
- `src/App.jsx` - Main app component with routing configuration
- `src/main.jsx` - Application entry point

### Authentication Flow
The app implements a two-step authentication process:
1. Username/password login (hardcoded: `admin` / `1234`)
2. OTP verification (hardcoded: `0000`)

Authentication state is managed via React Context and persisted in localStorage. Protected routes are handled by the Layout component, which redirects unauthenticated users to the login page.

### Routing Architecture
```javascript
// Protected routes wrapped in Layout component
<Route path="/" element={<Layout />}>
  <Route index element={<Navigate to="/welcome" />} />
  <Route path="welcome" element={<Welcome />} />
  <Route path="users" element={<Users />} />
  <Route path="orders" element={<Orders />} />
  <Route path="*" element={<Navigate to="/welcome" />} />
</Route>
```

### UI Patterns
- All text is in Traditional Chinese
- Forms use modal dialogs for CRUD operations
- Status indicators use colored Tailwind classes
- Responsive design with Tailwind utilities
- Sidebar navigation with emoji icons

### Data Handling
- No backend API - all data is mock/in-memory
- User management supports CRUD operations (state-based)
- Orders are randomly generated on component mount
- No data persistence except authentication state

## Important Notes

1. This is a test/demo application with hardcoded credentials
2. No testing framework is configured
3. All components use plain JavaScript/JSX (no TypeScript)
4. The app is fully client-side with no API integration
5. ESLint is configured but no pre-commit hooks are set up