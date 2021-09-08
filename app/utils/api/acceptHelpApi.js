import apiCall from './apiCall';

/**
 * Get open requests in specified radius of user's location.
 * @param longitude
 * @param latitude
 * @param radius
 * @returns open requests
 */
export const getOpenRequests = async ({ longitude, latitude, radius }) => {
  try {
    const response = await apiCall({
      url: 'help-request'
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    throw Error(e.data.message);
  }
};

/**
 * Accept open request
 * @param requestId
 * @param helpRequest
 */
export const acceptOpenRequest = async ({ requestId, helpRequest }) => {
  try {
    const response = await apiCall({
      url: `help-request/${requestId}`,
      method: 'PUT',
      data: helpRequest
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    throw Error(e.data.message);
  }
};

/**
 * Change request status
 * @param requestId
 * @param status
 */
export const changeRequestStatus = async ({ requestId, status }) => {
  try {
    const response = await apiCall({
      url: `help-request/${requestId}/status`,
      method: 'PUT',
      data: status
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    throw Error(e.data.message);
  }
};
