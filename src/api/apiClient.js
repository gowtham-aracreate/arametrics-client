/**
 * @file /Users/gowtham/code/projects/arametrics/system/client/src/api/apiClient.js
 * @author Gowtham <gowtham@aracreate.com>
 * @version 2.0.0
 * @license Apache-2.0
 * @copyright 2024 araCreate GmbH
 */

import axios from 'axios';
// import axiosRetry from 'axios-retry';

import { Url } from "../helper/apiHelper";
import { SessionStorage } from '../util/storage';
import { formatData } from '../util/utils';
import { SessionStorageKeys } from '../helper/constants';
import { errorMsg } from '../util/toaster';
// import { errorMsg } from '../util/toaster';

// Create Axios instance with base configuration
const apiClient = axios.create({
    baseURL: `${Url.baseApiUrl}`,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Configure retry logic
// const retryDelay = (retryNumber = 0) => {
//     const seconds = Math.pow(2, retryNumber) * 1000;
//     const randomMs = 1000 * Math.random();
//     return seconds + randomMs;
// };

// axiosRetry(apiClient, {
//     retries: 0,
//     retryDelay,
//     retryCondition: axiosRetry.isRetryableError,
// });

const DEBUG = process.env.NODE_ENV === "development";

// Handle error responses
function errorResponseHandler(error) {
    if (DEBUG) {
        console.error(`Error: ${formatData(error)}`);
    }
    if (error.response && error.response.data) {
        if (error.response.status === 401 && error.response.data?.retry) {
            //TODO: add refresh token logic 
            errorMsg("Refresh Token expired, Login again")
        }

        if (!!error.response.data.statusCode) {
            return Promise.reject(error.response.data);
        }

        if (error.response.message) {
            errorMsg(error.response.message);
            // return;
        }

        if (error.message) {
            errorMsg(error.message);
            // return;
        }


        // console.log(error.response, error.response.data)
        // if (error.response.data === 'A token is required for authentication' || error.response.data === 'INVALID_TOKEN') {
        //     SessionStorage.clearAll();
        //     window.location.href = '/';
        // } else {
        //     errorMsg(error.response.data);
        // }
        // } else if (error.message) {
        //     errorMsg(error.message);
        // } else {
        //     errorMsg("Please contact support.", { autoClose: 5000 });
    }

    return error;
}

// Add request interceptor
apiClient.interceptors.request.use(config => {
    const token = SessionStorage.getItem(SessionStorageKeys.SessionToken);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (DEBUG) {
        console.info(`Request: ${formatData(config)}`);
    }

    return config;
}, errorResponseHandler);

// Add response interceptor
apiClient.interceptors.response.use(response => {
    if (DEBUG) {
        console.info(`Response: ${formatData(response)}`);
    }

    return response;
}, errorResponseHandler);

// Utility functions for making API calls
export const getAPICall = async (url, params) => {
    return await apiClient.get(url, { params });
};

export const postAPICall = async (url, data) => {
    return await apiClient.post(url, data);
};

export const putAPICall = async (url, data) => {
    return await apiClient.put(url, data);
};

export const deleteAPICall = async (url, data) => {
    return await apiClient.delete(url, { data });
};

export default apiClient;
