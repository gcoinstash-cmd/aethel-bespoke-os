-- ==============================================================================
-- AETHEL BESPOKE CORDWAINER STUDIO — SEED DATA (v1.0.0)
-- ==============================================================================

-- 1. Insert Client Bespoke Last Registry
INSERT INTO public.client_lasts (last_id, client_name, wood_type, fitting_status, instep_girth_mm, waist_girth_mm, joint_width_mm, arch_curvature, vault_location) VALUES
('LAST-LND-091', 'Lord Sterling Vance', 'Steamed Hornbeam', 'Master Approved', 252.5, 238.0, 102.5, 'High Fiddleback', 'Vault Drawer A-01'),
('LAST-ZUR-104', 'Dr. Maximilian Meyer', 'Aged Beechwood', 'Master Approved', 260.0, 244.5, 105.0, 'Moderate Beveled', 'Vault Drawer B-08'),
('LAST-NYC-219', 'Harrison Cole', 'Steamed Hornbeam', 'Rough Turned', 248.0, 232.0, 99.5, 'Extreme Fiddleback', 'Vault Drawer C-12'),
('LAST-TOK-334', 'Kenji Takahashi', 'Aged Beechwood', 'Digital Scan', 242.0, 229.0, 98.0, 'Subtle English Square', 'Vault Drawer D-04');

-- 2. Insert Tannery & Hide Inventory
INSERT INTO public.leather_inventory (tannery_name, hide_grade, colorway, thickness_mm, square_meters_available, reserved_meters, cost_per_sqm, status) VALUES
('Tannerie d''Annonay (France)', 'Grade I Vocalou Box Calf', 'Obsidian Black', 1.25, 68.0, 24.5, 340.00, 'In Vault'),
('Tannerie d''Annonay (France)', 'Grade I Rusticalf Grain', 'Cognac Patina', 1.30, 42.0, 16.0, 360.00, 'In Vault'),
('Charles F. Stead (Leeds)', 'Janus Full Reverse Calf Suede', 'Espresso Snuff', 1.40, 55.0, 18.0, 290.00, 'In Vault'),
('J. & F.J. Baker (Colyton)', 'Oak Bark Tanned Soling Hide', 'Natural Russet', 5.50, 85.0, 38.0, 480.00, 'In Vault'),
('Horween Leather Co. (Chicago)', 'Genuine Shell Cordovan #8', 'Dark Burgundy', 1.80, 28.0, 22.0, 750.00, 'Low Stock');

-- 3. Insert Active Bespoke Commissions
INSERT INTO public.bespoke_commissions (commission_id, client_name, client_email, client_tier, model_name, leather_spec, construction, stage, progress_pct, deposit_amount, total_price, estimated_delivery, notes) VALUES
('AETHEL-7821', 'Lord Sterling Vance', 'sterling.vance@mayfairholdings.co.uk', 'Patron VIP', 'The Sovereign Oxford', 'Annonay Obsidian Box Calf', 'Hand-Welted 12 SPI', 'Sole Stitching', 78, 1600.00, 3400.00, CURRENT_DATE + INTERVAL '18 days', 'Fiddleback waist with brass toe tap flush sink. Client requested museum shine.'),
('AETHEL-7822', 'Dr. Maximilian Meyer', 'm.meyer@zurich-neuro.ch', 'Bespoke Atelier', 'The Savoy Double Monk', 'Annonay Cognac Patina', 'Hand-Welted 10 SPI', 'Closing Upper', 52, 1500.00, 3100.00, CURRENT_DATE + INTERVAL '34 days', 'Double brass buckles hand-filed to matte chamfer. Second fitting completed.'),
('AETHEL-7823', 'Harrison Cole', 'h.cole@manhattanpartners.com', 'Bespoke Atelier', 'The Chelsea Wholecut', 'Charles F. Stead Espresso Suede', 'Hand-Welted 12 SPI', 'Trial Fitting', 35, 1400.00, 2950.00, CURRENT_DATE + INTERVAL '45 days', 'Waste leather trial shoe in transit to Manhattan for fitting feedback.'),
('AETHEL-7824', 'Kenji Takahashi', 'k.takahashi@ginza-capital.jp', 'Private Collection', 'The Churchill Balmoral Boot', 'Horween Shell Cordovan #8 / Pebble Grain', 'Goyser Norwegian Welt', 'Last Carving', 15, 2200.00, 4800.00, CURRENT_DATE + INTERVAL '72 days', 'Dual-wood last blank in lathe. Hornbeam toe block hand shaped.');
