CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url VARCHAR(255),
    last_active_at TIMESTAMPTZ,
    role VARCHAR(50) DEFAULT 'staff'
);

CREATE TABLE IF NOT EXISTS malls (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    location VARCHAR(255),
    image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS units (
    id SERIAL PRIMARY KEY,
    mall_id INT REFERENCES malls(id) ON DELETE CASCADE,
    unit_no VARCHAR(20) NOT NULL,
    level VARCHAR(50) NOT NULL,
    level_order INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'vacant' CHECK (status IN ('vacant', 'occupied', 'reserved')),
    tenant_name VARCHAR(100),
    person_in_charge VARCHAR(100),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    area_sqm DECIMAL(10, 2),
    water_point BOOLEAN DEFAULT FALSE,
    water_pipe_diameter VARCHAR(20),
    floor_traps INT DEFAULT 0,
    ac_power_kw DECIMAL(10, 2),
    fcu_units INT DEFAULT 0,
    electric_isolator_tpn_val VARCHAR(50),
    emergency_lights INT DEFAULT 0,
    exit_signage INT DEFAULT 0,
    pa_speaker INT DEFAULT 0,
    fibre_port INT DEFAULT 0,
    data_ports INT DEFAULT 0,
    gas_pipe BOOLEAN DEFAULT FALSE,
    kitchen_ea BOOLEAN DEFAULT FALSE,
    kitchen_ea_val VARCHAR(50),
    kitchen_fa BOOLEAN DEFAULT FALSE,
    kitchen_fa_val VARCHAR(50),
    sprinkler INT DEFAULT 0,
    unit_model TEXT,
    metadata JSONB,
    embedding vector(384) -- Semantic Search Prep
);

CREATE INDEX idx_units_unit_no ON units(unit_no);
CREATE INDEX idx_units_mall_id ON units(mall_id);

CREATE TABLE IF NOT EXISTS sales_kits (
    id SERIAL PRIMARY KEY,
    mall_id INT REFERENCES malls(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    type VARCHAR(50) DEFAULT 'sales' CHECK (type IN ('sales', 'ads', 'floorplan', 'others')),
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(50),
    company VARCHAR(100),
    type VARCHAR(50) NOT NULL CHECK (type IN ('Tenant', 'Agent', 'Vendor')),
    remark TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    author VARCHAR(100),
    role VARCHAR(50),
    target_property VARCHAR(100) DEFAULT 'General',
    expiry_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat_logs (
    id SERIAL PRIMARY KEY,
    user_id INT,
    message TEXT,
    response TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dashboard_notes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    target_date VARCHAR(10) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO contacts (name, email, phone, company, type, remark) VALUES 
('Default Tenant', 'email@example.com', '111-1111', 'Example Co', 'Tenant', '<insert here>'),
('Default Agent', 'agent@example.com', '222-2222', 'Example Agency', 'Agent', '<insert here>'),
('Default Vendor', 'vendor@example.com', '333-3333', 'Example Vendor', 'Vendor', '<insert here>');