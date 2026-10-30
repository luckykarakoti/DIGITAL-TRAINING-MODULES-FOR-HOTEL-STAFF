# Project audit and fixes

## Verified in this environment
- Backend starts with Node.js and serves the health endpoint.
- `GET /api/roles`, `/api/modules`, `/api/scenarios`, `/api/inspection`, and `/api/quick-cards` returned HTTP 200.
- Login with a wrong password returns HTTP 401.
- Demo staff and manager login with the documented demo password returns HTTP 200.
- `/api/auth/me` accepts the returned bearer token and returns the logged-in user.
- Analytics returns HTTP 403 for a staff token and HTTP 200 for a manager token.
- Registration without a password returns HTTP 400.
- Backend JavaScript files pass `node --check`.

## Fixes applied
- Added bcrypt password verification for login and bcrypt hashing for registration.
- Added password hashes to seeded demo users (demo password: `password123`).
- Removed the insecure unauthenticated fallback session from protected routes.
- Enforced manager-only access to analytics.
- Added bearer-token attachment to frontend API requests and token persistence in the auth context.
- Ensured dotenv is loaded before backend modules read environment variables.
- Disabled the demo account switch endpoint in production.
- Removed the uploaded local `.env` file from this cleaned archive; configure from `.env.example`.

## Still not verified / remaining work
- Frontend production build could not be completed in this Linux test environment because the uploaded `node_modules` did not contain Rollup's Linux optional binary; dependency installation timed out. Run `npm install` on your Windows PC to install platform-correct packages, then `npm run build`.
- Browser-based visual testing of every page and button was not possible here.
- MongoDB models exist, but API controllers still use `backend/data/store.js` (in-memory data). MongoDB persistence must be implemented before real deployment.
- The app has no login rate limiting, password reset flow, email verification, or production-grade account provisioning.

## Local setup
1. Extract this archive and open the `lucky project` folder in VS Code.
2. Run `npm install` in the root.
3. Run `cd backend && npm install && cd ..`.
4. Run `cd frontend && npm install && cd ..`.
5. Copy `backend/.env.example` to `backend/.env` and set a strong random `JWT_SECRET`.
6. Run `npm run dev`.
7. Open `http://localhost:5173`; API health is at `http://localhost:5000/api/health`.
