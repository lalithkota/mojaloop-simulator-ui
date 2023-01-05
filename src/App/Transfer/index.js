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

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Button,
  DataList,
  Spinner,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  Title
} from "components";
import SimpleTransferForm from "./SimpleTransferForm";
import AdvancedTransferForm from "./AdvancedTransferForm";
import TransferResponse from "./TransferResponse";
import "./Transfer.css";

import {
  changeName,
  changeOperation,
  changeHomeTransactionId,
  changeFromDisplayName,
  changeFromIdType,
  changeFromIdValue,
  changeToIdType,
  changeToIdValue,
  changeNote,
  changeAmountType,
  changeAmount,
  changeCurrency,
  changeTransactionType,
  setMode,
  resetForm,
  randomizeForm,
  exportFormrandomize,
  sendTransfer,
  toggleAllFields,
  retrieveTransfers,
} from "./actions";
import {
  getIsTransferLoading,
  getTransfer,
  getTransferResponse,
  getTransfers,
  getIsSubmitEnabled,
  getIsSubmitPending,
  getIsAllFieldsVisible,
  getIsAdvancedMode,
  getValidationResult
} from "./selectors";

const stateProps = state => ({
  isTransferLoading: getIsTransferLoading(state),
  transfer: getTransfer(state),
  transferList: getTransfers(state),
  transferResponse: getTransferResponse(state),
  isSubmitEnabled: getIsSubmitEnabled(state),
  isSubmitPending: getIsSubmitPending(state),
  isAllFieldsVisible: getIsAllFieldsVisible(state),
  isAdvancedMode: getIsAdvancedMode(state),
  validation: getValidationResult(state)
});

const actionProps = dispatch => ({
  onMount: () => dispatch(retrieveTransfers()),
  onNameChange: value => dispatch(changeName(value)),
  onOperationChange: value => dispatch(changeOperation(value)),
  onHomeTransactionIdChange: value => dispatch(changeHomeTransactionId(value)),
  onFromDisplayNameChange: value => dispatch(changeFromDisplayName(value)),
  onFromIdTypeChange: value => dispatch(changeFromIdType(value)),
  onFromIdValueChange: value => dispatch(changeFromIdValue(value)),
  onToIdTypeChange: value => dispatch(changeToIdType(value)),
  onToIdValueChange: value => dispatch(changeToIdValue(value)),
  onNoteChange: value => dispatch(changeNote(value)),
  onAmountTypeChange: value => dispatch(changeAmountType(value)),
  onAmountChange: value => dispatch(changeAmount(value)),
  onCurrencyChange: value => dispatch(changeCurrency(value)),
  onTransactionTypeChange: value => dispatch(changeTransactionType(value)),
  onModeSelect: (_, tabIndex) => dispatch(setMode(tabIndex)),
  onSendTransferClick: () => dispatch(sendTransfer()),
  onResetFormButtonClick: () => dispatch(resetForm()),
  onRandomizeFormButtonClick: () => dispatch(randomizeForm()),
  onExportFormButtonClick: () => dispatch(exportFormrandomize()),
  onAllFieldsViewChange: () => dispatch(toggleAllFields()),
  onRefreshTransfers: () => dispatch(retrieveTransfers()),
});

const TransferLoader = () => <Spinner center size="m" />;
const TransferError = () => (
  <div id="app_error">There was an error while reading the environments</div>
);

class Transfer extends PureComponent {
  render() {
    const {
      transfer,
      transferResponse,
      transferList,
      validation,
      isSubmitEnabled,
      isSubmitPending,
      isAllFieldsVisible,
      isAdvancedMode,

      onNameChange,
      onOperationChange,
      onHomeTransactionIdChange,
      onFromDisplayNameChange,
      onFromIdTypeChange,
      onFromIdValueChange,
      onToIdTypeChange,
      onToIdValueChange,
      onNoteChange,
      onAmountTypeChange,
      onAmountChange,
      onCurrencyChange,
      onTransactionTypeChange,

      onModeSelect,
      onResetFormButtonClick,
      onRandomizeFormButtonClick,
      onExportFormButtonClick,
      onSendTransferClick,
      onAllFieldsViewChange,
      onRefreshTransfers
    } = this.props;

    const transferListColumns = [
      {
        label: "Transfer Id",
        key: "transferId"
      },
      {
        label: "To",
        key: "to"
      },
      {
        label: "To Id Type",
        key: "toIdType"
      },
      {
        label: "To Id Value",
        key: "toIdValue"
      },
      {
        label: "From",
        key: "from"
      },
      {
        label: "From Id Type",
        key: "fromIdType"
      },
      {
        label: "From Id Value",
        key: "fromIdValue"
      },
      {
        label: "Amount",
        key: "amount"
      },
      {
        label: "Currency",
        key: "currency"
      },
      {
        label: "Transfer Time",
        key: "creationTime"
      }
    ];

    return (
      <div id="transfer">
        <div className="transfer__runner__section">
          <Title>Transfers</Title>

          <Title small>Send/Receive</Title>
          <Tabs onSelect={onModeSelect} selected={isAdvancedMode ? 1 : 0}>
            <TabList>
              <Tab>Simple Mode</Tab>
              <Tab>Advanced Mode</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SimpleTransferForm
                  transfer={transfer}
                  validation={validation}
                  onNameChange={onNameChange}
                  onOperationChange={onOperationChange}
                  onHomeTransactionIdChange={onHomeTransactionIdChange}
                  onFromDisplayNameChange={onFromDisplayNameChange}
                  onFromIdTypeChange={onFromIdTypeChange}
                  onFromIdValueChange={onFromIdValueChange}
                  onToIdTypeChange={onToIdTypeChange}
                  onToIdValueChange={onToIdValueChange}
                  onNoteChange={onNoteChange}
                  onAmountTypeChange={onAmountTypeChange}
                  onAmountChange={onAmountChange}
                  onCurrencyChange={onCurrencyChange}
                  onTransactionTypeChange={onTransactionTypeChange}
                />
              </TabPanel>
              <TabPanel>
                <AdvancedTransferForm
                  transfer={transfer}
                  validation={validation}
                  onResetFormButtonClick={onResetFormButtonClick}
                  onRandomizeFormButtonClick={onRandomizeFormButtonClick}
                  onExportFormButtonClick={onExportFormButtonClick}
                  onNameChange={onNameChange}
                  onOperationChange={onOperationChange}
                  onHomeTransactionIdChange={onHomeTransactionIdChange}
                  onFromDisplayNameChange={onFromDisplayNameChange}
                  onFromIdTypeChange={onFromIdTypeChange}
                  onFromIdValueChange={onFromIdValueChange}
                  onToIdTypeChange={onToIdTypeChange}
                  onToIdValueChange={onToIdValueChange}
                  onNoteChange={onNoteChange}
                  onAmountTypeChange={onAmountTypeChange}
                  onAmountChange={onAmountChange}
                  onCurrencyChange={onCurrencyChange}
                  onTransactionTypeChange={onTransactionTypeChange}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>

          <div className="transfer__button__row">
            <Button
              className="transfer__button__item"
              icon="open"
              label="Send Transfer"
              iconPosition="right"
              disabled={!isSubmitEnabled}
              pending={isSubmitPending}
              onClick={onSendTransferClick}
            />
          </div>
        </div>

        <Title small>Transfers</Title>
        <div className="transfer__button__row">
          <Button
            className="transfer__button__item"
            label="Refresh Transfers"
            onClick={onRefreshTransfers}
          />
        </div>
        <DataList
          list={transferList}
          columns={transferListColumns}
        />
      </div>
    );
  }
}

class TransferWrapper extends PureComponent {
  componentWillMount(){
    this.props.onMount();
  }
  render() {
    if (this.props.isTransferLoading) {
      return <TransferLoader />;
    } else if (this.props.isTransferLoadingFailed) {
      return <TransferError />;
    }
    return <Transfer {...this.props} />;
  }
}

const ConnectedTransfer = connect(
  stateProps,
  actionProps
)(TransferWrapper);

export default ConnectedTransfer;

export { Transfer };
