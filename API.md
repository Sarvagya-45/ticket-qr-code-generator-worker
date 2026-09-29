# Database Schema

## 1. Purpose

This document defines the proposed data model for the Ticket QR Code Generator Worker.

The schema is intentionally focused on the core ticket workflow.

No unnecessary user, analytics, or business entities are introduced unless they are required by the application.

---

## 2. Entity Relationship Overview

The core application revolves around a Ticket record.

```text
Ticket
  |
  | 1
  |
  | generates
  |
  | many
  v
QR Generation Record
```
