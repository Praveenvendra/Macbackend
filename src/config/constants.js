export const API_ENDPOINT = 'https://ig.gov-cloud.ai/tf-entity-ingestion/v1.0/schemas/677b7e3e2028154e85125b66';

export const ADHOC = 'https://ig.gov-cloud.ai/pi-cohorts-service/v1.0/cohorts/adhoc'

export const HEADERS = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
});
