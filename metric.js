import {BetaAnalyticsDataClient} from '@google-analytics/data';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Load credentials
const keyFile = path.join(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS);
const credentials = JSON.parse(fs.readFileSync(keyFile, 'utf8'));

const client = new BetaAnalyticsDataClient({ credentials });

async function listMetadata() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const property = `properties/${propertyId}`;

  const [metadata] = await client.getMetadata({
    name: `${property}/metadata`,
  });

  console.log("\n=== Metrics ===");
  metadata.metrics.forEach(m => {
    console.log(`${m.apiName} (${m.uiName || 'no uiName'})`);
  });
}

listMetadata().catch(console.error);
