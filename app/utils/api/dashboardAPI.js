import React from 'react';
import apiUrl from './apiUrl';

/**
 * Get active requests for displaying on dashboard.
 * @returns current request
 */
export const getActiveRequests = async () => {
  const endpoint = `${apiUrl()}dashboard/active-requests`;

  console.log("get active requests");
  fetch(endpoint, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
  }).then(async (res) => {
    if (res.status === 200) {
      res = await res.json();
      console.log("result: ", res);
    }
    res = await res.json();
    throw Error(res.errors[0]); // ToDo: Throw multiple errors
  });
  return {
    helpSeeker: [{
      name: "Max Schmidt",
      status: "called",
      requestType: "groceries",
      urgency: "now",
      phone: "040/299960980",
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
      startedAt: 0,
    }],
    helper: {
      name: "Helfername",
      status: "accepted",
      requestType: "groceries",
      urgency: "now",
      phone: "040/299960980",
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
      startedAt: 0,
    }
  };
  /*return fetch(endpoint, {
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
  });*/
};

/**
 * Get finished requests for displaying on dashboard.
 * @returns old requests
 */
export const getFinishedRequests = async () => {
  const endpoint = `${apiUrl()}dashboard/finished-requests`;

  return {
    helpSeeker: [{
      name: 'Erika Müller',
      phone: '040/299960980',
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
      startedAt: 1593774600,
      finishedAt: 1593869056
    },
    {
      name: 'Erika Müller',
      phone: '040/299960980',
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
      startedAt: 1593774600,
      finishedAt: 1593869056
    }],
    helper: [{
      name: 'Erika Müller',
      phone: '040/299960980',
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
      startedAt: 1593774600,
      finishedAt: 1593869056
    },
    {
      name: 'Erika Müller',
      phone: '040/299960980',
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
      startedAt: 1593774600,
      finishedAt: 1593869056
    }]
  };
  /*return fetch(endpoint, {
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
  });*/
};



