-- Complete Supabase Database Setup
-- Run this in Supabase Dashboard → SQL Editor

-- Create all tables
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    full_name VARCHAR,
    hashed_password VARCHAR NOT NULL,
    phone VARCHAR,
    role VARCHAR DEFAULT 'user',
    address VARCHAR,
    city VARCHAR DEFAULT 'Aba South',
    postal_code VARCHAR DEFAULT '643677',
    latitude FLOAT,
    longitude FLOAT,
    total_earnings FLOAT DEFAULT 0.0,
    total_pickups INTEGER DEFAULT 0,
    total_waste_kg FLOAT DEFAULT 0.0,
    total_co2_averted_kg FLOAT DEFAULT 0.0,
    points INTEGER DEFAULT 0,
    fcm_token VARCHAR,
    password_reset_token VARCHAR,
    password_reset_token_expires TIMESTAMP,
    recovery_token VARCHAR,
    recovery_token_expires TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS waste_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    waste_type VARCHAR NOT NULL,
    weight_kg FLOAT NOT NULL,
    description TEXT,
    image_url VARCHAR,
    ai_confidence FLOAT,
    ai_suggestions TEXT,
    points_earned INTEGER DEFAULT 0,
    amount_earned FLOAT DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pickups (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR DEFAULT 'pending',
    pickup_address VARCHAR NOT NULL,
    pickup_latitude FLOAT,
    pickup_longitude FLOAT,
    scheduled_date TIMESTAMP,
    completed_date TIMESTAMP,
    waste_type VARCHAR,
    estimated_weight_kg FLOAT,
    actual_weight_kg FLOAT,
    collector_id INTEGER REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recycling_stations (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    city VARCHAR DEFAULT 'Aba',
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    phone VARCHAR,
    email VARCHAR,
    accepted_waste_types VARCHAR,
    operating_hours VARCHAR,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR,
    amount FLOAT NOT NULL,
    points INTEGER DEFAULT 0,
    description VARCHAR,
    reference_id VARCHAR UNIQUE,
    reference_type VARCHAR,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR NOT NULL,
    body TEXT NOT NULL,
    type VARCHAR,
    is_read BOOLEAN DEFAULT FALSE,
    data TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rewards (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    points_required INTEGER NOT NULL,
    reward_type VARCHAR,
    reward_value FLOAT,
    image_url VARCHAR,
    is_active BOOLEAN DEFAULT TRUE,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS system_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR UNIQUE NOT NULL,
    value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW(),
    updated_by INTEGER REFERENCES users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_waste_entries_user_id ON waste_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_pickups_user_id ON pickups(user_id);
CREATE INDEX IF NOT EXISTS idx_pickups_status ON pickups(status);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_system_settings_key ON system_settings(key);

-- Insert admin users
INSERT INTO users (
    email, username, full_name, hashed_password, 
    role, phone, city, postal_code,
    total_earnings, total_pickups, total_waste_kg, 
    total_co2_averted_kg, points, is_active, 
    created_at, updated_at
) VALUES (
    'admin@trashverse.ng',
    'admin',
    'Admin User',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5ztpXxqYr4Oi6',  -- password: admin123
    'admin',
    '+234 123 456 7890',
    'Aba South',
    '643677',
    0.0, 0, 0.0, 0.0, 0, true, NOW(), NOW()
) ON CONFLICT (email) DO NOTHING;

INSERT INTO users (
    email, username, full_name, hashed_password, 
    role, phone, city, postal_code,
    total_earnings, total_pickups, total_waste_kg, 
    total_co2_averted_kg, points, is_active, 
    created_at, updated_at
) VALUES (
    'test@trashverse.ng',
    'testuser',
    'Test Admin',
    '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',  -- password: test123
    'admin',
    '+234 987 654 3210',
    'Aba South',
    '643677',
    0.0, 0, 0.0, 0.0, 0, true, NOW(), NOW()
) ON CONFLICT (email) DO NOTHING;

-- Insert system settings
INSERT INTO system_settings (key, value, updated_at) VALUES
('company_name', '"TrashVerse"', NOW()),
('company_email', '"info@trashverse.ng"', NOW()),
('company_phone', '"+234 123 456 7890"', NOW()),
('support_email', '"support@trashverse.ng"', NOW()),
('points_per_kg', '10.0', NOW()),
('naira_per_kg', '50.0', NOW()),
('min_withdrawal_amount', '1000.0', NOW())
ON CONFLICT (key) DO NOTHING;

-- Verify setup
SELECT 'Users created:' as info, COUNT(*) as count FROM users WHERE role = 'admin';
SELECT 'System settings created:' as info, COUNT(*) as count FROM system_settings;
SELECT 'All tables:' as info;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
