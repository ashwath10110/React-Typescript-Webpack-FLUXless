
import AppDispatcher from '../dispatchers/appDispatcher';

import AppConstants from '../constants';

import { AuthActionTypes, ProviderTypes } from '../actions/types';
import { BaseStore } from './baseStore';
import { AppEvent } from '../events/appEvent';
import { IAuth } from '../interfaces/auth';

// https://developers.google.com/drive/v3/web/appdata
// https://console.developers.google.com/apis/credentials?project=memoirable
// https://security.google.com/settings/security/permissions
class GoogleAuthStore extends BaseStore<IAuth> {
  _clientId = AppConstants.gAuthDetails.clientId;
  _scopes = AppConstants.gAuthDetails.scopes;
  callback: () => void;
  selectedDate = new Date();
  folderIds = {
    'Memoirable': '',
    'Entries': '',
    'currentFolderId': ''
  }
  currentFileId: string = '';
  currentFolderIdInUse: string;
  currentFileObj: any;

 
  _authorize(immediate: boolean, event: AppEvent) {
    gapi.auth.authorize({
      'client_id': this._clientId,
      'scope': this._scopes.join(' '),
      'immediate': immediate,
      response_type: 'token'
    }, function(authResult) {
      if (!authResult || authResult.error) {
        this._authorize.bind(this, false, event)();
        return;
      }

      this._changeToken = event.type;
      this.emitChange();
    }.bind(this));
  }

  _sign_out() {
    gapi.auth.setToken(null);
  }
 
  _getProfileInfo(event: AppEvent) {
    gapi.client.load('plus', 'v1', function() {
      var request = gapi.client.plus.people.get({
        'userId': 'me'
      });
      request.execute(function(resp) {
        this._state = {
          displayName: resp.displayName
        };
        this._changeToken = event.type;
        this.emitChange();
      }.bind(this));
    }.bind(this));
  }

  constructor(dispatcher: Flux.Dispatcher<AppEvent>) {
    super(dispatcher, (event: AppEvent) => {
      if (event.payLoad.provider !== ProviderTypes.GOOGLE) {
        return;
      }
      switch (event.type) {
        case AuthActionTypes.AUTH_INITIALIZE:
          this._authorize.bind(this, true, event)();
          break;
        case AuthActionTypes.AUTH_GET_PROFILE:
          this._getProfileInfo.bind(this, event)();
          break;
        default:
          break;
      }

    }, () => {
      return {
        displayName: ''
      };
    });
  }
}

const GoogleAuthStoreInstance = new GoogleAuthStore(AppDispatcher);

export default GoogleAuthStoreInstance;
