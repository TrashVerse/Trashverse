-- Create Admin Users in Supabase
-- Run this in Supabase Dashboard → SQL Editor

-- Admin User 1: admin / admin123
INSERT INTO users (
    email, 
    username, 
    full_name, 
    hashed_password, 
    role, 
    phone,
    city,
    postal_code,
    total_earnings,
    total_pickups,
    total_waste_kg,
    total_co2_averted_kg,
    points,
    is_active, 
    created_at,
    updated_at
) VALUES (
    'admin@trashverse.ng',
    'admin',
    'Admin User',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5ztpXxqYr4Oi6',  -- password: admin123
    'admin',
    '+234 123 456 7890',
    'Aba South',
    '643677',
    0.0,
    0,
    0.0,
    0.0,
    0,
    true,
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- Admin User 2: testuser / test123
INSERT INTO users (
    email, 
    username, 
    full_name, 
    hashed_password, 
    role, 
    phone,
    city,
    postal_code,
    total_earnings,
    total_pickups,
    total_waste_kg,
    total_co2_averted_kg,
    points,
    is_active, 
    created_at,
    updated_at
) VALUES (
    'test@trashverse.ng',
    'testuser',
    'Test Admin',
    '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',  -- password: test123
    'admin',
    '+234 987 654 3210',
    'Aba South',
    '643677',
    0.0,
    0,
    0.0,
    0.0,
    0,
    true,
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- Create System Settings
INSERT INTO system_settings (key, value, updated_at) VALUES
('company_name', '"TrashVerse"', NOW()),
('company_email', '"info@trashverse.ng"', NOW()),
('company_phone', '"+234 123 456 7890"', NOW()),
('support_email', '"support@trashverse.ng"', NOW()),
('points_per_kg', '10.0', NOW()),
('naira_per_kg', '50.0', NOW()),
('min_withdrawal_amount', '1000.0', NOW())
ON CONFLICT (key) DO NOTHING;

-- Verify admin users were created
SELECT id, username, email, role, is_active, created_at 
FROM users 
WHERE role = 'admin';

-- Verify system settings were created
SELECT key, value, updated_at 
FROM system_settings;
