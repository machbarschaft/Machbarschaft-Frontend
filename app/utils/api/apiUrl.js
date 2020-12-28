export default function apiUrl() {
  if (process.env.NODE_ENV === 'development') {
    return '/v1';
  }

  if (process.env.API_URL_SUB) {
    return `${process.env.API_URL_SUB}.machbarschaft.jetzt`;
  }

  return 'https://api.machbarschaft.jetzt';
}
