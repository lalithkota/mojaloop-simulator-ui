/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License.                                            *
 ******************************************************************************/

import { buildFetchActions } from "modusbox-ui-components/dist/redux-fetch";

const handleError = (error, status, state) => {
  if (status === 401) {
    window.location.assign(state.app.config.loginUrl);
    // should exit the execution of the function
    // otherwise the non-authenticated response will be
    // treater as a regular response error, causing the UI
    // to display wrong error messages
    return;
  }
  return { error, status };
};

const services = {
  test: {
    getApplicationUrl: state => {
      const backendUrl = "process.env.BACKEND_TEST_URL";
      console.log(`${backendUrl}`);
      return `${backendUrl}`;
    },
    getApplicationHeaders: () => undefined,
    credentials: state => undefined,
    mode: "no-cors",
    sendAsJson: true,
    parseAsJson: true,
    handleError: handleError
  },
  simulator: {
    getApplicationUrl: state => {
      const backendUrl = "process.env.BACKEND_SIMULATOR_URL";
      console.log(`${backendUrl}`);
      return `${backendUrl}`;
    },
    getApplicationHeaders: () => {
      return undefined;
    },
    credentials: state => {
      return undefined;
    },
    sendAsJson: true,
    parseAsJson: true,
    handleError: handleError
  }
};

const endpoints = {
  party: {
    service: services.test,
    url: ({ idType, idValue }) => `/repository/parties/${idType}/${idValue}`
  },
  parties: {
    service: services.test,
    url: "/repository/parties"
  },
  scenarios: {
    service: services.test,
    url: "/scenarios"
  },
  quoteRequests: {
    service: services.simulator,
    url: () => `/quoterequests`
  }
};

const apis = buildFetchActions(endpoints);
export default apis;
