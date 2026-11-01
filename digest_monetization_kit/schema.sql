-- Cloudflare D1 SQL Schema for Curated Resource Digest & Affiliate Engine
-- 100% Modern Evidence-Based Standards

CREATE TABLE IF NOT EXISTS curated_items (
    item_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    source_url TEXT NOT NULL,
    source_domain TEXT NOT NULL,
    author TEXT,
    summary TEXT,
    evidence_level TEXT NOT NULL,
    methodology_score INTEGER DEFAULT 0,
    utility_score INTEGER DEFAULT 0,
    is_sponsored INTEGER DEFAULT 0,
    affiliate_url TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS digests (
    issue_number INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    publish_date TEXT NOT NULL,
    curator TEXT NOT NULL,
    lead_editorial TEXT,
    item_count INTEGER DEFAULT 0,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS click_events (
    click_id TEXT PRIMARY KEY,
    slug TEXT NOT NULL,
    destination_url TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    user_agent TEXT,
    referer TEXT,
    country_code TEXT
);

CREATE TABLE IF NOT EXISTS sponsor_slots (
    slot_id TEXT PRIMARY KEY,
    sponsor_name TEXT NOT NULL,
    tier TEXT NOT NULL,
    monthly_retainer_usd REAL NOT NULL,
    target_url TEXT NOT NULL,
    cloaked_slug TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_click_slug ON click_events(slug);
CREATE INDEX IF NOT EXISTS idx_items_evidence ON curated_items(evidence_level);
