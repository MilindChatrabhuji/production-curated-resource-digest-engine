# Deployment Manual - Production Curated Resource Digest & Affiliate Engine

## Prerequisites
- Node.js v18+ LTS
- Cloudflare Wrangler CLI (`npm install -g wrangler`)
- Cloudflare Free Tier Account

## Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/MilindChatrabhuji/production-curated-resource-digest-engine.git
   cd production-curated-resource-digest-engine
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run test demo runner:
   ```bash
   node engine/curation_engine/demo_runner.js
   ```

## Cloudflare Workers Edge Deployment
1. Initialize Cloudflare D1 database:
   ```bash
   npx wrangler d1 create digest_db
   ```
2. Apply schema migration:
   ```bash
   npx wrangler d1 execute digest_db --file=engine/edge_digest_gateway/schema.sql
   ```
3. Deploy to production edge:
   ```bash
   npx wrangler deploy
   ```
