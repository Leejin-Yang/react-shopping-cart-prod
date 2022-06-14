import axios from 'configs/api';
import { User } from 'types';
import { getAccessToken } from 'utils/auth';

import PATH from 'constants/path';

const authAPI = {
  login: async function (user: User) {
    try {
      const {
        data: { accessToken },
      } = await axios.post(PATH.REQUEST_LOGIN, user);

      sessionStorage.setItem('accessToken', accessToken);

      return this.getUserInfo(accessToken);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },

  getUserInfo: async function (accessToken = getAccessToken()) {
    try {
      const { data } = await axios.get(PATH.REQUEST_USER_INFO, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },

  duplicateUsername: async function (username: User['username']) {
    try {
      return await axios.post(PATH.REQUEST_SIGNUP_DUPLICATION_USERNAME, {
        username,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },

  duplicateEmail: async function (email: User['email']) {
    try {
      return await axios.post(PATH.REQUEST_SIGNUP_DUPLICATION_EMAIL, {
        email,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },

  signup: async function (user: User) {
    try {
      await axios.post(PATH.REQUEST_SIGNUP, user);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },

  editUserInfo: async function (user: User) {
    const accessToken = getAccessToken();

    try {
      await axios.put(PATH.REQUEST_USER_INFO, user, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return this.getUserInfo(accessToken);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },

  deleteUser: async function () {
    const accessToken = getAccessToken();

    try {
      await axios.delete(PATH.REQUEST_USER_INFO, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      sessionStorage.removeItem('accessToken');
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },
};

export default authAPI;
