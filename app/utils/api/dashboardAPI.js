import React from 'react';
import apiUrl from './apiUrl';

/**
 * Get current request of helper for displaying on dashboard.
 * @returns current request
 */
export const getCurrentRequestHelper = async () => {
  const endpoint = `${apiUrl()}dashboard/helper/currentRequests`;

  return [{
    name: "Max Mustermann",
    status: "accepted",
    phone: "01575/12345",
    requestType: "medication",
    urgency: "now",
    extras: {
      carNecessary: false,
      prescriptionRequired: true
    },
    address: {
      street: "Straßenname",
      zipCode: 1234,
      city: "München"
    },
    startedAt: 100000
  }];
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
 * Get old requests of helper for displaying on dashboard.
 * @returns old requests
 */
export const getOldRequestsHelper = async () => {
  const endpoint = `${apiUrl()}dashboard/helper/oldRequests`;

  return [
    // ToDo: fetch from backend
    {
      name: 'Erika Müller',
      phone: '040/299960980',
      address: {
        street: 'Höhenstadter Str. 56',
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
      finishedAt: 1593869056,
    },
    {
      name: 'Erika Müller',
      phone: '040/299960980',
      address: {
        street: 'Höhenstadter Str. 56',
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
      finishedAt: 1593869056,
    },
    {
      name: 'Erika Müller',
      phone: '040/299960980',
      address: {
        street: 'Höhenstadter Str. 56',
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
      finishedAt: 1593869056,
    },
    {
      name: 'Erika Müller',
      phone: '040/299960980',
      address: {
        street: 'Höhenstadter Str. 56',
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
      finishedAt: 1593869056,
    },
  ];
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
 * Get current requests of help seeker for displaying on dashboard.
 * @returns current request
 */
export const getCurrentRequestsHelpSeeker = async () => {
  const endpoint = `${apiUrl()}dashboard/helpSeeker/currentRequests`;

  return [{
    name: "Max Schmidt",
    status: "accepted",
    phone: "01575/12345",
    requestType: "groceries",
    urgency: "now",
    extras: {
      carNecessary: true,
      prescriptionRequired: false
    },
    address: {
      street: "Straßenname",
      zipCode: 1234,
      city: "München"
    },
    startedAt: 0
  },{
    name: "Max Mustermann",
    status: "open",
    phone: "01575/12345",
    requestType: "medication",
    urgency: "now",
    extras: {
      carNecessary: false,
      prescriptionRequired: true
    },
    address: {
      street: "Straßenname",
      zipCode: 1234,
      city: "München"
    },
    startedAt: 100000
  }];
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
 * Get old requests of help seeker for displaying on dashboard.
 * @returns old requests
 */
export const getOldRequestsHelpSeeker = async () => {
  const endpoint = `${apiUrl()}dashboard/helpSeeker/oldRequests`;

  return [
    // ToDo: fetch from backend
    {
      name: 'Erika Müller',
      phone: '040/299960980',
      address: {
        street: 'Höhenstadter Str. 56',
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
      finishedAt: 1593869056,
    },
    {
      name: 'Erika Müller',
      phone: '040/299960980',
      address: {
        street: 'Höhenstadter Str. 56',
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
      finishedAt: 1593869056,
    },
    {
      name: 'Erika Müller',
      phone: '040/299960980',
      address: {
        street: 'Höhenstadter Str. 56',
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
      finishedAt: 1593869056,
    },
    {
      name: 'Erika Müller',
      phone: '040/299960980',
      address: {
        street: 'Höhenstadter Str. 56',
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
      finishedAt: 1593869056,
    },
  ];
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
