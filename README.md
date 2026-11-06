
# Geriatric Care Assessment Form

A responsive one-page assessment form for collecting geriatric patient information, clinical assessment details, follow-up dates, and consent.

## Tech Stack

- React 19
- TypeScript
- Mantine 9
- Zod 4
- Vite
- Vitest and React Testing Library

## Features

- Patient information and clinical assessment fields
- Schema-based validation using Zod
- Validation on blur and form submission
- Age eligibility validation (60 years and above)
- Barthel Index validation (0–100, steps of 5)
- Polypharmacy pharmacist-review validation
- Follow-up date validation
- Consent requirement
- Load sample patient functionality
- Simulated save with loading and success states

## Getting Started

Install dependencies:

```bash
corepack yarn install
```

Start the development server:

```bash
corepack yarn dev
```

## Testing

Run tests:

```bash
corepack yarn vitest
```

Run TypeScript checks:

```bash
corepack yarn typecheck
```

Create a production build:

```bash
corepack yarn build
```

## Project Structure

```text
src/
  App.tsx
  assessmentSchema.ts
  App.test.tsx
  assessmentSchema.test.ts
  main.tsx
```

## Notes

- All patient information used in the sample is fictional.
- Saving is simulated on the client side; no backend or database is connected.
- The project was developed as a time-boxed take-home assignment.
- Future improvements could include backend integration, persistent storage, accessibility testing, and additional edge-case tests.

## Time Spent

Approximately [enter your actual development time].
