export default function apiUrl() {
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.API_URL_SUB === 'local'
  ) {
    return '/v1';
  }

  if (process.env.API_URL_SUB) {
    return `https://${process.env.API_URL_SUB}.machbarschaft.jetzt/v1`;
  }

  return 'https://api.machbarschaft.jetzt/v1';
}
