## Getting Started

_Minimum node version 18_

This project developed using Nextjs Framework, to run this project please follow this step

```bash
nvm use
--
pnpm install
--
pnpm run dev
```

Open [http://localhost:3004](http://localhost:3004) with your browser to see the result.

## .env.local

Please add this code into `env.local` to run this on localhost

```bash
BASE_URL="http://localhost:3004"
SERVICE_BASE_URL="https://api.github.com"

GITHUB_CLIENT_ID="Iv23li6Wz4y50TTywt5K"
GITHUB_CLIENT_SECRET="b997909e172973d9b86a7450779436e023d225af"
GITHUB_STATE="qwerty*123"
```

## Unit Test

To run all unit test

```bash
pnpm run test
```

To run specific file to run unit test

```bash
pnpm run test <rootDir>/__tests__/store/user-store.test.ts
```
