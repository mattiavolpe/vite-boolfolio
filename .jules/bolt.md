## 2024-06-26 - Package Lock Safety
**Learning:** Deleting `package-lock.json` when running `pnpm install` in a repository with mixed package managers destroys dependency locking and breaks reproducible builds.
**Action:** Never modify or delete `package-lock.json` without explicit instruction, even if standardizing on `pnpm`.
