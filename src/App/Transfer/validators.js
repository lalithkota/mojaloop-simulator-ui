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
  createValidator,
  createValidation,
  vd
} from "modusbox-ui-components/dist/redux-validation";

const isUuid = createValidator(`Is a valid UUID`, v =>
  /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/.test(
    v
  )
);

const isIdType = createValidator(`Is a valid idType`, v =>
  v ? [
    "MSISDN",
    "ACCOUNT_ID",
    "IBAN",
    "PERSONAL_ID",
    "ALIAS"
  ].includes(v) : false
);

export const getTransferRequestValidators = () => {
  const validators = {
    name: createValidation([vd.isRequired, vd.isAlphaNum]),
    operation: createValidation([vd.isRequired]),
    body: {
      note: createValidation([vd.isRequired]),
      homeTransactionId: createValidation([vd.isRequired, isUuid]),
      transactionType: createValidation([vd.isRequired]),
      from: {
        idType: createValidation([vd.isRequired, isIdType]),
        idValue: createValidation([vd.isRequired])
      },
      to: {
        idType: createValidation([vd.isRequired, isIdType]),
        idValue: createValidation([vd.isRequired])
      },
      amountType: createValidation([vd.isRequired]),
      amount: createValidation([vd.isRequired, vd.isNum]),
      currency: createValidation([vd.isRequired, vd.maxLength(3)])
    }
  };
  return validators;
};
