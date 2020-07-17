import React from 'react';
import apiUrl from './apiUrl';

/**
 * Get active requests for displaying on dashboard.
 * @returns current request
 */
export const getActiveRequests = async () => {
  const endpoint = `${apiUrl()}dashboard/active-requests`;

  /*return {
    helpSeeker: [{
      name: "Max Schmidt",
      status: "called",
      requestType: "groceries",
      urgency: "now",
      phoneHelpSeeker: 40299960980,
      extras: {
        carNecessary: true,
        prescriptionRequired: false
      },
      address: {
        street: "Straßenname",
        houseNumber: 25,
        zipCode: 1234,
        city: "München"
      },
      startedAt: "2020-07-14T14:00:37.117Z",
    },{
      name: "Max Schmidt",
      status: "called",
      requestType: "groceries",
      urgency: "now",
      phoneHelpSeeker: 40299960980,
      extras: {
        carNecessary: true,
        prescriptionRequired: false
      },
      address: {
        street: "Straßenname",
        houseNumber: 25,
        zipCode: 1234,
        city: "München"
      },
      startedAt: "2020-07-14T14:00:37.117Z",
    }],
    helper: {
      name: "Helfername",
      status: "accepted",
      requestType: "groceries",
      urgency: "now",
      phoneHelpSeeker: 40299960980,
      extras: {
        carNecessary: true,
        prescriptionRequired: false
      },
      address: {
        street: "Straßenname",
        houseNumber: 25,
        zipCode: 1234,
        city: "München"
      },
      startedAt: "2020-07-14T14:00:37.117Z",
    }
  };*/
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
      console.log("got from dashboard api active: ", res);
      return res;
    }
    res = await res.json();
    throw Error(res.errors[0]); // ToDo: Throw multiple errors
  });
};

/**
 * Get finished requests for displaying on dashboard.
 * @returns old requests
 */
export const getFinishedRequests = async () => {
  const endpoint = `${apiUrl()}dashboard/finished-requests`;

  /*return {
    helpSeeker: [{
      name: 'Erika Müller',
      address: {
        street: 'Höhenstadter Str.',
        houseNumber:  25,
        zipCode: '81671',
        city: 'München',
      },
      requestType: 'groceries',
      urgency: 'now',
      extras: {
        carNecessary: true,
        prescriptionRequired: false,
      },
      startedAt: "2020-07-14T14:00:37.117Z",
      finishedAt: "2020-07-14T14:00:37.117Z"
    },
    {
      name: 'Erika Müller',
      address: {
        street: 'Höhenstadter Str.',
        houseNumber: 10,
        zipCode: '81671',
        city: 'München',
      },
      requestType: 'medication',
      urgency: 'now',
      extras: {
        carNecessary: true,
        prescriptionRequired: false,
      },
      startedAt: "2020-07-14T14:00:37.117Z",
      finishedAt: "2020-07-14T14:00:37.117Z"
    }],
    helper: [{
      name: 'Erika Müller',
      address: {
        street: 'Höhenstadter Str.',
        houseNumber: 56,
        zipCode: '81671',
        city: 'München',
      },
      requestType: 'other',
      urgency: 'now',
      extras: {
        carNecessary: true,
        prescriptionRequired: false,
      },
      startedAt: "2020-07-14T14:00:37.117Z",
      finishedAt: "2020-07-14T14:00:37.117Z"
    },
    {
      name: 'Erika Müller',
      address: {
        street: 'Höhenstadter Str.',
        houseNumber: 2,
        zipCode: '81671',
        city: 'München',
      },
      requestType: 'groceries',
      urgency: 'now',
      extras: {
        carNecessary: true,
        prescriptionRequired: false,
      },
      startedAt: "2020-07-14T14:00:37.117Z",
      finishedAt: "2020-07-14T14:00:37.117Z"
    }]
  };*/
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
      return res;
    }
    res = await res.json();
    throw Error(res.errors[0]); // ToDo: Throw multiple errors
  });
};



