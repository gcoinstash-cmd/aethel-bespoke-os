-- ==============================================================================
-- AETHEL BESPOKE CORDWAINER STUDIO — SUPABASE DATABASE SCHEMA (v1.0.0)
-- Hand-Welted Footwear Atelier, Bespoke Lasts & Annonay Leather Ledger OS
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Bespoke Commissions Table
CREATE TABLE IF NOT EXISTS public.bespoke_commissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commission_id VARCHAR(32) NOT NULL UNIQUE, -- e.g. 'AETHEL-7821'
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_tier VARCHAR(64) NOT NULL DEFAULT 'Bespoke Atelier', -- 'Bespoke Atelier', 'Patron VIP', 'Private Collection'
    model_name VARCHAR(128) NOT NULL, -- 'The Sovereign Oxford', 'The Savoy Double Monk', etc.
    leather_spec VARCHAR(128) NOT NULL, -- 'Annonay French Calf', 'Charles F. Stead Suede', etc.
    construction VARCHAR(64) NOT NULL DEFAULT 'Hand-Welted 12 SPI',
    stage VARCHAR(64) NOT NULL DEFAULT 'Last Carving', -- 'Last Carving', 'Trial Fitting', 'Closing Upper', 'Sole Stitching', 'Finished'
    progress_pct INTEGER NOT NULL DEFAULT 15 CHECK (progress_pct >= 0 AND progress_pct <= 100),
    deposit_amount NUMERIC(10, 2) NOT NULL DEFAULT 1500.00,
    total_price NUMERIC(10, 2) NOT NULL DEFAULT 3200.00,
    estimated_delivery DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Client Bespoke Last Registry
CREATE TABLE IF NOT EXISTS public.client_lasts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    last_id VARCHAR(32) NOT NULL UNIQUE, -- e.g. 'LAST-LND-091'
    client_name VARCHAR(255) NOT NULL,
    wood_type VARCHAR(64) NOT NULL DEFAULT 'Steamed Hornbeam',
    fitting_status VARCHAR(64) NOT NULL DEFAULT 'Master Approved', -- 'Digital Scan', 'Rough Turned', 'Master Approved'
    instep_girth_mm NUMERIC(6, 1) NOT NULL,
    waist_girth_mm NUMERIC(6, 1) NOT NULL,
    joint_width_mm NUMERIC(6, 1) NOT NULL,
    arch_curvature VARCHAR(64) NOT NULL DEFAULT 'High Fiddleback',
    vault_location VARCHAR(64) NOT NULL DEFAULT 'Vault Drawer B-14',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Premium Tannery & Hide Inventory
CREATE TABLE IF NOT EXISTS public.leather_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tannery_name VARCHAR(128) NOT NULL, -- 'Tannerie d''Annonay (France)', 'Charles F. Stead (Leeds)'
    hide_grade VARCHAR(128) NOT NULL, -- 'Grade I Box Calf', 'Janus Calf Suede'
    colorway VARCHAR(64) NOT NULL, -- 'Obsidian Black', 'Cognac Patina', 'Espresso'
    thickness_mm NUMERIC(4, 2) NOT NULL DEFAULT 1.25,
    square_meters_available NUMERIC(8, 2) NOT NULL DEFAULT 42.50,
    reserved_meters NUMERIC(8, 2) NOT NULL DEFAULT 14.00,
    cost_per_sqm NUMERIC(10, 2) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'In Vault',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.bespoke_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_lasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leather_inventory ENABLE ROW LEVEL SECURITY;

-- 6. Public Read & Commission Policies
CREATE POLICY "Allow public read access to client lasts status" 
    ON public.client_lasts FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert to bespoke commissions" 
    ON public.bespoke_commissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to leather inventory" 
    ON public.leather_inventory FOR SELECT USING (true);
