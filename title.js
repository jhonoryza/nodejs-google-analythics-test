import {BetaAnalyticsDataClient} from '@google-analytics/data';
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

async function run() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const property = `properties/${propertyId}`;

  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 30);

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

  // Build request
  const [response] = await client.runReport({
    property,
    dateRanges: [
      {
        startDate: startDate.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
      },
    ],
    metrics: [
      {name: 'eventCount'},
      {name: 'activeUsers'},
    ],
    dimensions: [
      {name: 'eventName'},
      {name: 'date'},
      {name: 'pageTitle'},
      {name: 'customEvent:game_id'},
    ],
    dimensionFilter: {
      andGroup: {
        expressions: [
          // Filter pageTitle
          {
            filter: {
              fieldName: 'pageTitle',
              stringFilter: {
                matchType: 'EXACT',
                value: 'Fruit Punch | Biblio',
              },
            },
          },
          // Event name OR filter
          eventNameFilter,
        ],
      },
    },
  });

  console.log(JSON.stringify(response, null, 2));
}

run().catch(console.error);

