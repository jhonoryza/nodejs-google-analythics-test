# Google Analythic Test

## Install

```bash
npm install && cp env.example .env
```

put `firebase.json` in base_path

update `.env` set `GA4_PROPERTY_ID`

## Run

Filter customEvent:game_id

```bash
node index.js
```

Filter pageTitle

```bash
node title.js
```

See All Dimension

```bash
node dimension.js
```

See All Metric

```bash
node metric.js
```

## Setup

firebase console
- generate new private key di menu `Service accounts`
- di menu `Integration` enable `Google Analytics API`

google analytics
- buat property
- add email service account sebagai editor 
- buat custom dimension