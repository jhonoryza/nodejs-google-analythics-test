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

