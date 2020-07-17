import apiUrl from './apiUrl';

/**
 * Check if feedback is required for a process
 * @returns boolean whether feedback is required
 */
export const getFeedbackNeeded = async (processId) => {
  const endpoint = `${apiUrl()}feedback/exists?processId=${processId}`;

  return fetch(endpoint, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
  }).then(async (res) => {
    if (res.status === 200) {
      res = await res.json();
      return {
        process: processId,
        needFeedback: res
      };
    }
    res = await res.json();
    throw Error(res.errors[0]); // ToDo: Throw multiple errors
  });
};

/**
 * Send feedback
 */
export const postFeedback = async (processId, isHelpSeeker, needContact, comment) => {
  const endpoint = `${apiUrl()}feedback/${isHelpSeeker ? "request" : "response"}?id=${processId}`;

  const tmp = { needContact, comment };
  const body = Object.keys(tmp)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(tmp[key])}`)
    .join('&');

  console.log("send feedback to '" + endpoint + "' with body: ", body);
  return fetch(endpoint, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    body: body
  }).then(async (res) => {
    if (res.status === 200) {
      res = await res.json();
      return res;
    }
    res = await res.json();
    throw Error(res.errors[0]); // ToDo: Throw multiple errors
  });
};



