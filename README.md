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
- [Invoice flow (sequence)](#invoice-flow-sequence)
- [Invoice state](#invoice-state)
- [Getting Started](#getting-started)
- [🗺️ Repository map](#️-repository-map)
- [📊 Code composition](#-code-composition)

## Invoice flow (sequence)

```mermaid
sequenceDiagram
    participant P as plumber
    participant APP as /dashboard
    participant DB as Supabase
    participant PG as payment gateway
    participant C as customer

    P->>APP: /invoice create
    APP->>DB: insert invoice (DRAFT)
    APP->>PG: create checkout link
    PG-->>APP: pay URL
    APP-->>P: send link to customer (SMS / email)
    C->>PG: pay (card / ACH)
    PG-->>APP: webhook PAID
    APP->>DB: status=PAID
    APP-->>P: notify on dashboard
```

## Invoice state

```mermaid
stateDiagram-v2
    [*] --> DRAFT
    DRAFT --> SENT
    SENT --> PAID: gateway webhook
    SENT --> OVERDUE: > 7 days unpaid
    OVERDUE --> PAID
    PAID --> [*]
```

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


## 🗺️ Repository map

Top-level layout of `plumberpay` rendered as a Mermaid mindmap (auto-generated from the on-disk tree).

```mermaid
mindmap
  root((plumberpay))
    public/
      file.svg
      globe.svg
      next.svg
      vercel.svg
      window.svg
    src/
      app
      lib
      proxy.ts
    supabase/
      migrations
      schema.sql
    files
      README.md
      next.config.ts
      package.json
      tsconfig.json
```


## 📊 Code composition

File-type breakdown of source under this repo (skips `.git`, `node_modules`, build caches, lockfiles).

```mermaid
pie showData title File-type composition of plumberpay (36 files)
    "TypeScript" : 19
    "SVG image" : 5
    "Markdown" : 4
    "JavaScript" : 2
    "SQL" : 2
    "JSON" : 2
    "Image" : 1
    "CSS" : 1
```
