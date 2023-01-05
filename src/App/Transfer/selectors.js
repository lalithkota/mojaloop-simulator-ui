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

import {
  toValidationResult,
  getIsValid
} from "modusbox-ui-components/dist/redux-validation";
import { getTransferRequestValidators } from "./validators";
import { createSelector } from "reselect";
import { createPendingSelector } from "modusbox-ui-components/dist/redux-fetch";
// import find from 'lodash/find';
// import get from 'lodash/get';

export const getIsTransferLoading = state => state.transfer.isTransferLoading;
export const getTransfer = state => state.transfer.transfer;
export const getTransferResponse = state => state.transfer.transferResponse;
export const getTransfers = state => state.transfer.transferList;
export const getIsAllFieldsVisible = state => state.transfer.isAllFieldsVisible;
export const getIsAdvancedMode = state => state.transfer.isAdvancedMode;

export const getValidationResult = createSelector(
  getTransfer,
  getTransferRequestValidators,
  toValidationResult
);

const getIsTransferModelValid = createSelector(
  getValidationResult,
  getIsValid
);

export const getIsScenarioCreatePending = createPendingSelector(
  "scenarios.create"
);

export const getIsSubmitEnabled = createSelector(
  getIsTransferModelValid,
  getIsScenarioCreatePending,
  (isValid, isPending) => isValid && !isPending
);

export const getIsSubmitPending = getIsScenarioCreatePending;
