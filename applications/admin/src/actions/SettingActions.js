import {API, graphqlOperation} from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import history from '../history';
import {setAlert} from './AlertActions';
import {setMessage} from './MessageActions';
import {loadingComplete, loadingStart} from './LoaderActions';

export const SettingActionTypes = {
  GET: '[Setting] Get',
  NEXT: '[Setting] Next'
};

export function createSetting (type, input) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {createSetting: {name}}} = await API.graphql(graphqlOperation(mutations.createSetting, {
        input: {
          name: input.name,
          value: JSON.stringify(input.value)
        },
        type
      }));

      dispatch(setMessage({
        message: `${name} has been added!`
      }));

      history.push(`/settings/${type}`);
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to create setting'
      }));
    }

    dispatch(loadingComplete());
  };
}

export function deleteSetting (id, type) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {deleteSetting: {name}}} = await API.graphql(graphqlOperation(mutations.deleteSetting, {
        id,
        type
      }));

      dispatch(setMessage({
        message: `${name} has been deleted!`
      }));

      history.push(`/settings/${type}`);
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to delete setting'
      }));
    }

    dispatch(loadingComplete());
  }
}

export function getSettings (type, limit) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {getSettings: {nextToken, settings}}} = await API.graphql(graphqlOperation(queries.getSettings, {
        limit,
        type
      }));

      dispatch(getSettingsReceived({
        nextToken,
        settings
      }));
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to get settings'
      }));
    }

    dispatch(loadingComplete());
  }
}

export function getSettingsReceived (payload) {
  return {
    payload,
    type: SettingActionTypes.GET
  };
}

export function nextSettings (type, limit, next) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {getSettings: {nextToken, settings}}} = await API.graphql(graphqlOperation(queries.getSettings, {
        limit,
        nextToken: next,
        type
      }));

      dispatch(nextSettingsReceived({
        nextToken,
        settings
      }));
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to get settings'
      }));
    }

    dispatch(loadingComplete());
  }
}

export function nextSettingsReceived (payload) {
  return {
    payload,
    type: SettingActionTypes.NEXT
  };
}

export function updateSetting (id, type, input) {
  return async function (dispatch) {
    dispatch(loadingStart());

    try {
      const {data: {updateSetting: {name}}} = await API.graphql(graphqlOperation(mutations.updateSetting, {
        id,
        input: {
          name: input.name,
          value: JSON.stringify(input.value)
        },
        type
      }));

      dispatch(setMessage({
        message: `${name} has been updated!`
      }));

      history.push(`/settings/${type}`);
    } catch (e) {
      dispatch(setAlert({
        message: e.errors.map(({message}) => message),
        title: 'Unable to update setting'
      }));
    }

    dispatch(loadingComplete());
  };
}
