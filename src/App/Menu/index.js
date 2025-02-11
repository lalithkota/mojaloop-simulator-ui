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

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Menu, MenuItem } from "components";
//import { getMenuIcons } from './selectors';

const stateProps = state => ({
  //  icons: getMenuIcons(state),
});

const MenuStructure = ({ pathname, onChange }) => {
  return (
    <Menu path="/" pathname={pathname} onChange={onChange}>
      <MenuItem path="/users" label="Users" />
      <MenuItem path="/transfer" label="Transfers" />
      <MenuItem path="/settings" label="Settings" />
    </Menu>
  );
};

const RouterMenu = ({ location, history }) => (
  <MenuStructure pathname={location.pathname} onChange={history.push} />
);
const ConnectedRouter = connect(
  stateProps,
  null
)(RouterMenu);
export default withRouter(ConnectedRouter);
