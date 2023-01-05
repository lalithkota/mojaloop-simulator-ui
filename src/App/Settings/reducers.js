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

import { handleActions } from "redux-actions";
import uuid from "uuid/v4";
import { setItem, getItem, removeItem } from "utils/storage";
import findIndex from "lodash/findIndex";
import {
  RESET_SETTINGS,
  SET_CONFIGURATIONS,
  SELECT_CONFIGURATION,
  REMOVE_CONFIGURATION,
  SAVE_SETTINGS_CONFIGURATION,
  SET_SETTINGS_NAME,
  SET_SETTINGS_PROTOCOL,
  SET_SETTINGS_HOST,
  SET_SETTINGS_PORT,
  SET_SETTINGS_PATH
} from "./actions";

const initialConfigurationState = [
  {
    id: "00000000",
    name: "default",
    protocol: "http",
    host: "localhost",
    port: "3003",
    path: ""
  }
];
if (process.env.NODE_ENV === 'production'){
  initialConfigurationState[0] = {
    id: "00000000",
    name: "default",
    protocol: "__BACKEND_TEST_URL_PROTO__",
    host: "__BACKEND_TEST_URL_HOST__",
    port: "__BACKEND_TEST_URL_PORT__",
    path: "__BACKEND_TEST_URL_PATH__",
    backendSimUrl: "__BACKEND_SIM_URL__"
  }
}

let configs = getItem("configurations");
let configurationId = getItem("configurationId");

if (!configs || !configs.length) {
  removeItem("configurations");
  configs = initialConfigurationState;
}

if (!configs.some(item => item.id === configurationId)) {
  removeItem("configurationId");
  configurationId = configs[0].id;
}

const initialState = {
  configurations: configs,
  name: undefined,
  protocol: undefined,
  host: undefined,
  port: undefined,
  path: undefined,
  configurationId
};

const Settings = handleActions(
  {
    [RESET_SETTINGS]: (state, action) => ({
      ...initialState
    }),
    [SET_CONFIGURATIONS]: (state, action) => {
      setItem("configurations", action.payload);
      return {
        ...state,
        configurations: action.payload
      };
    },
    [SAVE_SETTINGS_CONFIGURATION]: (state, action) => {
      const newState = {
        ...state,
        configurations: [
          ...state.configurations,
          {
            id: uuid(),
            name: state.name,
            protocol: state.protocol,
            host: state.host,
            port: state.port,
            path: state.path
          }
        ],
        name: "",
        protocol: "",
        host: "",
        port: ""
      };
      setItem("configurations", newState.configurations);
      return newState;
    },
    [SELECT_CONFIGURATION]: (state, action) => {
      setItem("configurationId", action.payload);
      return {
        ...state,
        configurationId: action.payload
      };
    },
    [REMOVE_CONFIGURATION]: (state, action) => {
      const index = findIndex(state.configurations, action.payload);
      const newState = {
        ...state,
        configurations: [
          ...state.configurations.slice(0, index),
          ...state.configurations.slice(index + 1)
        ]
      };
      setItem("configurations", newState.configurations);
      return newState;
    },
    [SET_SETTINGS_NAME]: (state, action) => ({
      ...state,
      name: action.payload
    }),
    [SET_SETTINGS_PROTOCOL]: (state, action) => ({
      ...state,
      protocol: action.payload
    }),
    [SET_SETTINGS_HOST]: (state, action) => ({
      ...state,
      host: action.payload
    }),
    [SET_SETTINGS_PORT]: (state, action) => ({
      ...state,
      port: action.payload
    }),
    [SET_SETTINGS_PATH]: (state, action) => ({
      ...state,
      path: action.payload
    })
  },
  initialState
);

export default Settings;
export { initialState };
