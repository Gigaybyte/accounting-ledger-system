# Accounting & Ledger Management System

A full-stack accounting and ledger management system built to manage financial transactions, ledger accounts, voucher entries, cash realization, and financial reporting.

The system provides structured double-entry accounting workflows with support for debit and credit transactions, transaction batches, ledger balances, and document attachments.

## Features

* Company and ledger management
* Double-entry accounting with Debit (Dr) and Credit (Cr) transactions
* Cash receipt and realization processing
* Voucher and transaction entry management
* Batch-based accounting transactions
* Duplicate voucher validation
* Duplicate supporting-document validation
* Transaction narration and descriptions
* Supporting document attachments
* Monthly ledger reporting
* Monthly opening and closing balance calculation
* Previous month's closing balance carried forward as the next month's opening balance
* Monthly Debit and Credit totals
* Transaction history
* Ledger-wise transaction filtering
* Date-range based financial reports
* MYR/RM amount formatting
* Excel export functionality
* Searchable and grouped financial data tables
* Database transaction handling for financial data consistency
* Email integration using SMTP configuration through environment variables

## Accounting Workflow

The system follows double-entry accounting principles where financial transactions are recorded using corresponding Debit and Credit entries.

For monthly ledger reports:

* The first month's opening balance starts from the configured initial balance.
* Each month's closing balance becomes the following month's opening balance.
* Debit and Credit totals are calculated separately for each month.
* The closing balance is determined after processing all transactions within the month.

## Cash Realization

The cash realization workflow handles multiple related accounting operations within a database transaction.

The process includes:

1. Checking for duplicate voucher entries.
2. Checking for duplicate supporting documents.
3. Creating the cash transaction entry.
4. Creating the associated transaction batch.
5. Creating Debit and Credit entry items.
6. Creating related purpose transactions.
7. Saving supporting document references.
8. Committing all operations as a single database transaction.

This helps maintain financial data consistency and prevents incomplete accounting transactions.

## Technologies

### Backend

* Node.js
* JavaScript
* Sequelize ORM
* REST APIs

### Database

* MySQL

### Frontend

* JavaScript
* HTML5
* CSS3
* Bootstrap
* jQuery
* DataTables

### Other Tools

* Git
* GitHub
* Nodemailer
* SMTP Email Integration
* Excel Export

## Database Structure

Core accounting entities include:

* Companies
* Ledgers
* Entries
* Entry Items
* Entry Batches
* Entry Item Documents

The database structure separates transaction headers, individual Debit/Credit items, transaction batches, ledger information, and supporting documents to provide a structured accounting workflow.

## Security

Sensitive configuration is stored using environment variables and is not committed to the repository.

Examples include:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

The `.env` file should always be excluded using `.gitignore`.

## Purpose

This project demonstrates practical experience in developing a real-world accounting application using Node.js, including:

* Backend API development
* Relational database design
* Financial transaction processing
* Double-entry accounting logic
* Database transactions
* Duplicate transaction prevention
* Ledger balance calculations
* Financial reporting
* Data export
* File/document management
* SMTP email integration

## Author

**SK Sakir Hossain**

Full Stack Developer
