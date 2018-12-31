import { camelizeKeys, decamelizeKeys } from 'humps';
import { createAction } from 'redux-actions';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import { normalize } from 'normalizr';
import { CALL_API, getJSON } from 'redux-api-middleware';

import constants from 'constants/AppConstants';
import types from 'constants/ActionTypes';

function buildAPIUrl(endpoint, params) {
  let url = `${constants.API_URL}/${endpoint}/`;

  const nonEmptyParams = pickBy(params, value => value !== '');

  if (!isEmpty(nonEmptyParams)) {
    url = `${url}?${getSearchParamsString(nonEmptyParams)}`;
  }

  return url;
}

function createTransformFunction(schema) {
  return (json) => {
    const camelizedJson = camelizeKeys(json);
    if (schema) {
      return normalize(camelizedJson, schema);
    }
    return camelizedJson;
  };
}

function parseJwt(token) {
  const payloadBase64 = token.split('.')[1] || '';
  const payload = window.atob(payloadBase64);
  const jwt = JSON.parse(payload);
  return jwt;
}

function getErrorTypeDescriptor(type, options = {}) {
  return {
    type,
    meta: action => ({
      API_ACTION: {
        apiRequestFinish: true,
        countable: options.countable,
        type: action[CALL_API].types[0].type,
      },
      ...options.meta,
    }),
  };
}

function getHeadersCreator(headers) {
  return (state) => {
    const authorizationHeaders = {};
    const currentTime = new Date().getTime() / 1000;
    if (state.auth.token && (currentTime < parseJwt(state.auth.token).exp)) {
      authorizationHeaders.Authorization = `JWT ${state.auth.token}`;
    } else if (state.auth.token) {
      const next = encodeURIComponent(window.location.href);
      window.location.assign(`${window.location.origin}/logout?next=${next}`);
      createAction(types.API.AUTH_LOGOUT)();
    }
    return Object.assign({}, constants.REQUIRED_API_HEADERS, headers, authorizationHeaders);
  };
}

function getRequestTypeDescriptor(type, options = {}) {
  return {
    type,
    meta: Object.assign({
      API_ACTION: {
        apiRequestStart: true,
        countable: options.countable,
        type,
      },
    }, options.meta),
  };
}

function getSearchParamsString(params) {
  const decamelized = decamelizeKeys(params);
  const parts = [];

  Object.keys(decamelized).forEach((key) => {
    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(decamelized[key])}`);
  });

  return parts.join('&');
}

function getSuccessPayload(options) {
  return (action, state, response) => (
    getJSON(response).then(createTransformFunction(options.schema))
  );
}

function getSuccessTypeDescriptor(type, options = {}) {
  return {
    type,
    payload: options.payload || getSuccessPayload(options),

    meta: action => (
      Object.assign({
        API_ACTION: {
          apiRequestFinish: true,
          countable: options.countable,
          type: action[CALL_API].types[0].type,
        },
      }, options.meta)
    ),
  };
}

export {
  buildAPIUrl,
  createTransformFunction,
  getErrorTypeDescriptor,
  getHeadersCreator,
  getRequestTypeDescriptor,
  getSearchParamsString,
  getSuccessTypeDescriptor,
};
