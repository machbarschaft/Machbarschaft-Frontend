export default function apiUrl() {
  if (process.env.NODE_ENV === 'development') {
    return '/v1';
  }

  if (process.env.REACT_APP_API_URL_SUB) {
    return `${process.env.REACT_APP_API_URL_SUB}.machbarschaft.jetzt`;
  }

  return 'https://api.machbarschaft.jetzt';
}
