import { createSelector } from 'reselect';
import { createPendingSelector } from 'modusbox-ui-components/dist/redux-fetch';
import find from 'lodash/find';
import get from 'lodash/get';
import { is422, is400, is500 } from 'utils/http';

export const getIsResultsLoading = state => state.app.isResultsLoading;
