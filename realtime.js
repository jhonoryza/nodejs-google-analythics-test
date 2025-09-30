import { BetaAnalyticsDataClient } from '@google-analytics/data';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // load .env

// Load credentials (firebase.json)
const keyFile = path.join(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS);
const credentials = JSON.parse(fs.readFileSync(keyFile, 'utf8'));

const client = new BetaAnalyticsDataClient({
  credentials,
});

async function runRealtime() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const property = `properties/${propertyId}`;

  // Event name filter (multiple OR)
  const eventNames = ['page_view', 'level_start', 'level_end', 'post_score'];
  const eventNameFilter = {
    orGroup: {
      expressions: eventNames.map(name => ({
        filter: {
          fieldName: 'eventName',
          stringFilter: {
            matchType: 'EXACT',
            value: name,
          },
        },
      })),
    },
  };

  // Build realtime request
  const [response] = await client.runRealtimeReport({
    property,
    metrics: [
      { name: 'eventCount' },
    ],
    dimensions: [
      { name: 'eventName' },
    ],
    dimensionFilter: eventNameFilter,
  });

  console.log(JSON.stringify(response, null, 2));
}

runRealtime().catch(console.error);
