import createClient from 'openapi-fetch';
import type { paths } from '../types/api/v1';

export const client = createClient<paths>({ baseUrl: import.meta.env.PUBLIC_API_BASE_URL });
