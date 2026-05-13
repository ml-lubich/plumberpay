# PlumberPay

> Invoice on-site for plumbers. Create an invoice in seconds, send it
> to the customer, and get paid before you leave the driveway. No
> contracts, no hidden fees.

```mermaid
flowchart LR
    USER[("👤 plumber<br/>on the job")]
    LANDING["🌐 / · landing"]
    AUTH{{"🔐 /signup · /login<br/>Supabase Auth"}}
    DASH["📊 /dashboard<br/>invoices · revenue"]
    NEW["🧾 /invoice<br/>create · send"]
    PAY["💳 customer pays<br/>card · ACH"]
    DB[("🗄 Supabase<br/>Postgres")]

    USER --> LANDING --> AUTH --> DASH
    DASH --> NEW --> DB
    NEW --> PAY --> DB

    classDef io fill:#0e1116,stroke:#2f81f7,stroke-width:1.5px,color:#e6edf3;
    classDef tool fill:#161b22,stroke:#3fb950,stroke-width:1.5px,color:#e6edf3;
    classDef brain fill:#161b22,stroke:#d29922,stroke-width:1.5px,color:#e6edf3;
    classDef out fill:#0e1116,stroke:#a371f7,stroke-width:1.5px,color:#e6edf3;
    class USER,DB io;
    class NEW,PAY,LANDING tool;
    class AUTH,DASH brain;
```

## Table of contents

- [Stack](#stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)

## Stack

- Next.js 16 + React 19 + Tailwind CSS 4
- Supabase (auth + database)
- Vercel deployment
- TypeScript strict mode

## Architecture

- `/` — Landing page
- `/signup`, `/login` — Auth flows (Supabase)
- `/dashboard` — Invoices, revenue, KPIs
- `/invoice` — Create / view invoices

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
