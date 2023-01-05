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
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import uuid from "uuid/v1";
import {
  SET_MODE,
  TOGGLE_ALL_FIELDS,
  SET_TRANSFER_LOADING,
  UNSET_TRANSFER_LOADING,
  SET_TRANSFER_RESPONSE,
  SET_TRANSFERS,
  CHANGE_TYPE,
  CHANGE_NAME,
  CHANGE_OPERATION,
  CHANGE_HOME_TRANSACTION_ID,
  CHANGE_FROM_ID_DISPLAY_NAME,
  CHANGE_FROM_ID_TYPE,
  CHANGE_FROM_ID_VALUE,
  CHANGE_TO_ID_TYPE,
  CHANGE_TO_ID_VALUE,
  CHANGE_NOTE,
  CHANGE_AMOUNT_TYPE,
  CHANGE_AMOUNT,
  CHANGE_CURRENCY,
  CHANGE_TRANSACTION_TYPE
} from "./actions";

const initialTransferState = {
  name: "Test",
  operation: "postTransfers",
  body: {
    homeTransactionId: uuid(),
    from: {
      displayName: "John Johnson",
      idType: "MSISDN",
      idValue: "123456"
    },
    to: {
      idType: "MSISDN",
      idValue: "000111"
    },
    note: "this is a test",
    amountType: "SEND",
    currency: "USD",
    amount: "100",
    transactionType: "TRANSFER"
  }
  //params: {} ?
};

const initialState = {
  isAdvancedMode: false,
  isAllFieldsVisible: false,
  isTransferLoading: false,
  transfer: initialTransferState,
  transferResponse: undefined
};

const changeTransferField = path => (state, action) => {
  const value = action.payload;
  let newState = cloneDeep(state);
  set(newState.transfer, path, value);
  return newState;
};

const Transfer = handleActions(
  {
    [SET_MODE]: (state, action) => ({
      ...state,
      isAdvancedMode: action.payload === 1
    }),
    [TOGGLE_ALL_FIELDS]: (state, action) => ({
      ...state,
      isAllFieldsVisible: !state.isAllFieldsVisible
    }),
    [SET_TRANSFER_LOADING]: (state, action) => ({
      ...state,
      isTransferLoading: true
    }),
    [UNSET_TRANSFER_LOADING]: (state, action) => ({
      ...state,
      isTransferLoading: false
    }),
    [SET_TRANSFER_RESPONSE]: (state, action) => ({
      ...state,
      transferResponse: action.payload
    }),
    [SET_TRANSFERS]: (state, action) => ({
      ...state,
      transferList: action.payload
    }),
    [CHANGE_TYPE]: changeTransferField("type"),
    [CHANGE_NAME]: changeTransferField("name"),
    [CHANGE_OPERATION]: changeTransferField("operation"),
    [CHANGE_HOME_TRANSACTION_ID]: changeTransferField("body.homeTransactionId"),
    [CHANGE_FROM_ID_DISPLAY_NAME]: changeTransferField("body.from.displayName"),
    [CHANGE_FROM_ID_TYPE]: changeTransferField("body.from.idType"),
    [CHANGE_FROM_ID_VALUE]: changeTransferField("body.from.idValue"),
    [CHANGE_TO_ID_TYPE]: changeTransferField("body.to.idType"),
    [CHANGE_TO_ID_VALUE]: changeTransferField("body.to.idValue"),
    [CHANGE_NOTE]: changeTransferField("body.note"),
    [CHANGE_AMOUNT_TYPE]: changeTransferField("body.amountType"),
    [CHANGE_CURRENCY]: changeTransferField("body.currency"),
    [CHANGE_AMOUNT]: changeTransferField("body.amount"),
    [CHANGE_TRANSACTION_TYPE]: changeTransferField("body.transactionType")
  },
  initialState
);

export default Transfer;
export { initialState };
