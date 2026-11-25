CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL DEFAULT '',
    company VARCHAR(160) NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO contacts (name, email, company) VALUES
    ('Анна Смирнова', 'anna@example.com', 'Bright Studio'),
    ('Максим Иванов', 'max@example.com', 'Northwind')
ON CONFLICT DO NOTHING;
