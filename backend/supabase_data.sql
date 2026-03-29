-- TrashVerse Data Export
-- Generated from local PostgreSQL
-- Run this in Supabase SQL Editor after creating the schema

-- Disable triggers temporarily for faster inserts
SET session_replication_role = replica;


-- Insert data into users (3 rows)
INSERT INTO users (id, email, username, full_name, hashed_password, phone, role, address, city, postal_code, latitude, longitude, total_earnings, total_pickups, total_waste_kg, total_co2_averted_kg, points, fcm_token, password_reset_token, password_reset_token_expires, recovery_token, recovery_token_expires, is_active, created_at, updated_at) VALUES (2, 'test@trashverse.ng', 'testuser', 'Test User', '$argon2id$v=19$m=65536,t=3,p=4$Q+ids7Z2jrEWorSWMsaY0w$Zx4cBMN089zt//MogvjQ5yvVOM1Hu/Iox1LycJ+Q1AM', '+234-800-TEST', 'user', 'Test Street', 'Aba South', '643677', 5.1065, 7.3986, 0.0, 0, 0.0, 0.0, 0, NULL, '1wGNOkZp_-e4iD9T0m9rwbGOd6-4rFswoNUQtAqixLk', '2026-03-18T11:14:33.639619', NULL, NULL, TRUE, '2026-03-18T10:43:27.416140', '2026-03-18T10:44:33.641618');
INSERT INTO users (id, email, username, full_name, hashed_password, phone, role, address, city, postal_code, latitude, longitude, total_earnings, total_pickups, total_waste_kg, total_co2_averted_kg, points, fcm_token, password_reset_token, password_reset_token_expires, recovery_token, recovery_token_expires, is_active, created_at, updated_at) VALUES (3, 'scepterboss@gmail.com', 'Scepter', 'Stanley Onyewuchi', '$argon2id$v=19$m=65536,t=3,p=4$LKX0/n/v/R9jjBHiHANg7A$03OrJ0vfOkLi4QTfGZ4vV8+nDTTTD7Akxx4/MlVrFC0', NULL, 'user', NULL, 'Aba South', '643677', NULL, NULL, 420.0, 0, 12.0, 18.0, 96, NULL, '4XB0WGicSksw8_gAPtQVq_aSedyYNkN9hPBIb7mWNHY', '2026-03-18T11:40:18.567085', NULL, NULL, TRUE, '2026-03-18T10:50:36.122630', '2026-03-18T11:10:18.568247');
INSERT INTO users (id, email, username, full_name, hashed_password, phone, role, address, city, postal_code, latitude, longitude, total_earnings, total_pickups, total_waste_kg, total_co2_averted_kg, points, fcm_token, password_reset_token, password_reset_token_expires, recovery_token, recovery_token_expires, is_active, created_at, updated_at) VALUES (1, 'admin@trashverse.ng', 'admin', 'TrashVerse Admin', '$argon2id$v=19$m=65536,t=3,p=4$I4TQWguhVCplDEEoBaB0zg$mt460f7pW4Kbb7x62FGQxsC4eXzaWoh3DboBueeVuso', '+234-800-TRASH', 'admin', 'TrashVerse HQ', 'Aba South', '643677', 5.1065, 7.3986, 0.0, 0, 0.0, 0.0, 0, NULL, 'N_n-L7QUR2RhcQTX4HNYz3sx8BmkcCmM-RrTTklrEGs', '2026-03-18T11:53:46.450858', NULL, NULL, TRUE, '2026-03-18T10:43:27.176199', '2026-03-18T11:23:46.453049');

-- Insert data into waste_entries (1 rows)
INSERT INTO waste_entries (id, user_id, waste_type, weight_kg, description, image_url, ai_confidence, ai_suggestions, points_earned, amount_earned, created_at) VALUES (1, 3, 'textile', 12.0, NULL, NULL, NULL, NULL, 96, 420.0, '2026-03-18T10:51:16.122121');
-- No data in pickups

-- Insert data into recycling_stations (3 rows)
INSERT INTO recycling_stations (id, name, address, city, latitude, longitude, phone, email, accepted_waste_types, operating_hours, is_active, created_at) VALUES (1, 'Aba Main Recycling Center', 'No. 123 Aba-Owerri Road', 'Aba', 5.1065, 7.3986, '+234-803-123-4567', 'aba@trashverse.ng', 'plastic,paper,metal,electronics', 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM', TRUE, '2026-03-18T10:43:27.521573');
INSERT INTO recycling_stations (id, name, address, city, latitude, longitude, phone, email, accepted_waste_types, operating_hours, is_active, created_at) VALUES (2, 'Ariaria Market Collection Point', 'Ariaria International Market', 'Aba', 5.1158, 7.3697, '+234-803-234-5678', 'ariaria@trashverse.ng', 'plastic,paper,textile', 'Mon-Sat: 7AM-7PM', TRUE, '2026-03-18T10:43:27.521581');
INSERT INTO recycling_stations (id, name, address, city, latitude, longitude, phone, email, accepted_waste_types, operating_hours, is_active, created_at) VALUES (3, 'School Road Eco Center', 'School Road, Aba South', 'Aba', 5.0972, 7.4025, '+234-803-345-6789', 'school@trashverse.ng', 'plastic,paper,metal,glass', 'Mon-Fri: 9AM-5PM', TRUE, '2026-03-18T10:43:27.521585');

-- Insert data into transactions (1 rows)
INSERT INTO transactions (id, user_id, type, amount, points, description, reference_id, reference_type, created_at) VALUES (1, 3, 'earning', 420.0, 96, 'Recycled 12.0kg of textile', 'WE20260318105116', 'waste_entry', '2026-03-18T10:51:16.246258');

-- Insert data into notifications (1 rows)
INSERT INTO notifications (id, user_id, title, body, type, is_read, data, created_at) VALUES (1, 3, 'Waste Entry Recorded!', 'You earned ₦420.0 and 96 points for recycling 12.0kg of textile', 'earning', FALSE, '{"entry_id": 1, "amount": 420.0, "points": 96}', '2026-03-18T10:51:16.284305');

-- Insert data into rewards (5 rows)
INSERT INTO rewards (id, name, description, points_required, reward_type, reward_value, image_url, is_active, stock_quantity, created_at) VALUES (1, '₦500 Cash Reward', 'Redeem 100 points for ₦500 cash', 100, 'cash', 500.0, NULL, TRUE, 100, '2026-03-18T10:43:27.562160');
INSERT INTO rewards (id, name, description, points_required, reward_type, reward_value, image_url, is_active, stock_quantity, created_at) VALUES (2, '₦1000 Cash Reward', 'Redeem 200 points for ₦1000 cash', 200, 'cash', 1000.0, NULL, TRUE, 50, '2026-03-18T10:43:27.562166');
INSERT INTO rewards (id, name, description, points_required, reward_type, reward_value, image_url, is_active, stock_quantity, created_at) VALUES (3, 'Eco-Friendly Water Bottle', 'Sustainable water bottle made from recycled materials', 50, 'product', 25.0, NULL, TRUE, 25, '2026-03-18T10:43:27.562169');
INSERT INTO rewards (id, name, description, points_required, reward_type, reward_value, image_url, is_active, stock_quantity, created_at) VALUES (4, 'Shopping Voucher - ₦2000', '₦2000 shopping voucher for eco-friendly products', 300, 'voucher', 2000.0, NULL, TRUE, 20, '2026-03-18T10:43:27.562171');
INSERT INTO rewards (id, name, description, points_required, reward_type, reward_value, image_url, is_active, stock_quantity, created_at) VALUES (5, 'Tree Planting Certificate', 'Plant a tree in your name and get a certificate', 75, 'product', 50.0, NULL, TRUE, 100, '2026-03-18T10:43:27.562173');

-- Re-enable triggers
SET session_replication_role = DEFAULT;

-- Reset sequences to max ID
SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE((SELECT MAX(id) FROM users), 1), true);
SELECT setval(pg_get_serial_sequence('waste_entries', 'id'), COALESCE((SELECT MAX(id) FROM waste_entries), 1), true);
SELECT setval(pg_get_serial_sequence('pickups', 'id'), COALESCE((SELECT MAX(id) FROM pickups), 1), true);
SELECT setval(pg_get_serial_sequence('recycling_stations', 'id'), COALESCE((SELECT MAX(id) FROM recycling_stations), 1), true);
SELECT setval(pg_get_serial_sequence('transactions', 'id'), COALESCE((SELECT MAX(id) FROM transactions), 1), true);
SELECT setval(pg_get_serial_sequence('notifications', 'id'), COALESCE((SELECT MAX(id) FROM notifications), 1), true);
SELECT setval(pg_get_serial_sequence('rewards', 'id'), COALESCE((SELECT MAX(id) FROM rewards), 1), true);

-- Success message
SELECT 'Data imported successfully!' as message;
