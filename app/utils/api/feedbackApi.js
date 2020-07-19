import apiUrl from './apiUrl';

/**
 * Send feedback
 */
export const postFeedback = async (id, isHelpSeeker, needContact, comment) => {
  const endpoint = `${apiUrl()}feedback/${
    isHelpSeeker ? 'request' : 'response'
  }/${id}`;

  const tmp = { needContact, comment };
  const body = Object.keys(tmp)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(tmp[key])}`)
    .join('&');

  console.log(`send feedback to '${endpoint}' with body: `, body);
  return fetch(endpoint, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    body: body,
  }).then(async (res) => {
    if (res.status === 201) {
      return;
    }
    res = await res.json();
    throw Error(res.errors[0]);
  });
};
