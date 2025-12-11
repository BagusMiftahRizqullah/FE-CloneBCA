import { environment } from 'src/environments/environment';

export const API_CONFIG = {
  baseUrl: `${environment.apiBaseUrl}/api`
};

export type ApiConfig = typeof API_CONFIG;
