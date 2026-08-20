# Red Shadow Designs security fix

These files are modified locally and are not yet committed or pushed to GitHub.

## Apply the patch

Copy the files in this archive into the root of the repository, preserving their directories. The archive contains only changed and newly added files; it does not contain `node_modules`, `.next`, or credentials.

Run:

```bash
pnpm install --frozen-lockfile
pnpm build
```

## Netlify variables

Set these variables in Netlify:

```text
ADMIN_PASSWORD=<new-long-random-password>
ADMIN_SESSION_SECRET=<different-long-random-secret>
WEB3FORMS_KEY=<your-Web3Forms-key>
```

Recreate `NEXT_PUBLIC_SITE_URL` as an ordinary non-secret public variable if it is currently marked as a secret. Rotate the old admin password and Web3Forms key before deploying.

Do not disable Netlify secret scanning.
