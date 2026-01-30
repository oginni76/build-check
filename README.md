# Project Implementation

Validation architecture implemented for NestJS project to ensure build stability 


## 🛠️ The 3-Layer Validation

### 1. Local Guard (Husky + Pre-Commit)
We use **Husky** to intercept local Git commands. 
- **When:** Every time a developer runs `git commit`.
- **Action:** Runs `npm run lint` (ESLint) and `npm run build` (TypeScript Compiler).
- **Why:** To catch errors immediately on the developer's laptop before they even push to the cloud.

### 2. Cloud Referee (GitHub Actions CI)
A secondary, independent check on a neutral server.
- **When:** Every time a Pull Request (PR) is opened or updated.
- **Action:** - Downloads code to a Ubuntu Linux container.
    - Performs a clean install (`npm ci`).
    - Executes `npm run build`.
- **Why:** Ensures the code works in a "clean room" environment, independent of any developer's local machine settings.

### 3. Branch Protection (The Law)
Enforcement via GitHub Repository settings.
- **Action:** The "Merge" button is physically locked until the **Cloud Referee** returns a Success (✅) status.
- **Why:** Prevents accidental merges of failing code.

---

## Tech Stack Summary
- **NestJS:** Core framework providing the `build` and `lint` scripts.
- **ESLint:** Enforces code style and catches "smells" (e.g., unused variables).
- **TypeScript:** Validates data types and syntax during the build process.
- **Husky:** Maps Git hooks to our package scripts.
- **GitHub Actions:** Automates the server-side validation.

---

## Testing the Workflow
1. **To test Local Guard:** Add a syntax error and try to `git commit`. The commit will be blocked.
2. **To test Cloud Referee:** Bypass the local guard using `git commit -m "..." --no-verify` and push. Check the GitHub **Actions** tab; the build will fail, and the PR will be blocked.

---

## Key Files
- `.husky/pre-commit`: Local hook script.
- `.github/workflows/ci.yml`: Server-side CI configuration.
- `package.json`: Contains the `prepare` and `lint` scripts.