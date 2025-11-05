
# SQL Validation - OpenCart Demo

This document contains sample SQL queries that can be used to validate data persisted by OpenCart when running scenarios like registration, add-to-cart, and order placement.

```sql
-- Validate registered customer exists
SELECT * FROM oc_customer WHERE email = 'testuser@example.com';

-- Validate cart content for a given session/customer
SELECT * FROM oc_cart WHERE customer_id = (SELECT customer_id FROM oc_customer WHERE email='testuser@example.com');

-- Validate orders table after checkout
SELECT * FROM oc_order WHERE customer_id = (SELECT customer_id FROM oc_customer WHERE email='testuser@example.com');
```
