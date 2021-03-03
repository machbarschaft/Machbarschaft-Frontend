import apiCall from './apiCall';

/**
 * Get requests for displaying on dashboard.
 * @returns requests
 */
export const getHelpRequests = async () => {
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
