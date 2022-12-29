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
import { Route } from "react-router-dom";
import { ScrollBox, Spinner } from "components";
import Toast from "./Toast";
import ErrorModal from "./ErrorModal";
import "./App.css";
import Navbar from "./Navbar";
import Menu from "./Menu";
import Users from "./Users";
import Transfer from "./Transfer";
import Settings from "./Settings";
// TODO: Enable when ready
// import Tester from './Tester';
// import Quotes from './Quotes';
// import Results from './Results';

import { initApp, hideErrorModal } from "./actions";
import {
  getIsAppLoading,
  getIsAppLoadingFailed,
  getIsToastVisible,
  getToastKind,
  getToastMessage,
  getIsErrorModalVisible,
  getErrorModalContent
} from "./selectors";

const AppLoader = () => <Spinner center size="m" />;
const AppError = () => (
  <div id="app_error">There was an error while reading the environments</div>
);

class App extends PureComponent {
  render() {
    const {
      isToastVisible,
      toastKind,
      toastMessage,
      isErrorModalVisible,
      errorModalContent,
      onCloseErrorModal
    } = this.props;
    return (
      <div id="app">
        <div id="app__navbar">
          <Navbar />
        </div>
        <div id="app__content">
          <div id="app__menu">
            <Menu />
          </div>
          <ScrollBox flex>
            <div id="app__views">
              <Route path="/users" component={Users} />
              <Route path="/transfer" component={Transfer} />
              <Route path="/settings" component={Settings} />
            </div>
          </ScrollBox>
        </div>
        <Toast
          isVisible={isToastVisible}
          message={toastMessage}
          kind={toastKind}
        />
        <ErrorModal
          isVisible={isErrorModalVisible}
          content={errorModalContent}
          onClose={onCloseErrorModal}
        />
      </div>
    );
  }
}

const stateProps = state => ({
  isAppLoading: getIsAppLoading(state),
  isAppLoadingFailed: getIsAppLoadingFailed(state),
  isToastVisible: getIsToastVisible(state),
  isErrorModalVisible: getIsErrorModalVisible(state),
  toastKind: getToastKind(state),
  toastMessage: getToastMessage(state),
  errorModalContent: getErrorModalContent(state)
});
const actionProps = dispatch => ({
  initApp: () => dispatch(initApp()),
  onCloseErrorModal: () => dispatch(hideErrorModal())
});

class AppWrapper extends PureComponent {
  componentWillMount() {
    this.props.initApp();
  }
  render() {
    if (this.props.isAppLoading) {
      return <AppLoader />;
    } else if (this.props.isAppLoadingFailed) {
      return <AppError />;
    }
    return <App {...this.props} />;
  }
}

const ConnectedApp = connect(
  stateProps,
  actionProps
)(AppWrapper);

export default ConnectedApp;

export { App };
