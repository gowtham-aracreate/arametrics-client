/**
 * @file /Users/gowtham/code/projects/arametrics/system/client/src/api/apiRoutes.js
 * @author Gowtham <gowtham@aracreate.com>
 * @version 2.0.0
 * @license Apache-2.0
 * @copyright 2024 araCreate GmbH
 */

import * as apiClient from './apiClient';
import { apiRoutes } from "../helper/apiHelper";

// auth services
// GET API
export const googleLoginApi = async (data) => await apiClient.getAPICall(apiRoutes.googleLogin, data).then(res => res.data);
export const googleSignupApi = async (data) => await apiClient.getAPICall(apiRoutes.googleSignup, data).then(res => res.data);

// POST API
export const registerApi = async (data) => await apiClient.postAPICall(apiRoutes.userRegister, data).then(res => res.data);
export const otpVerifyApi = async (data) => await apiClient.postAPICall(apiRoutes.otpVerify, data).then(res => res.data);
export const setPasswordApi = async (data) => await apiClient.postAPICall(apiRoutes.setPassword, data).then(res => res.data);
export const otpResendApi = async (data) => await apiClient.postAPICall(apiRoutes.otpResend, data).then(res => res.data);
export const forgotPasswordApi = async (data) => await apiClient.postAPICall(apiRoutes.forgotPassword, data).then(res => res.data);
export const loginApi = async (data) => await apiClient.postAPICall(apiRoutes.userLogin, data).then(res => res.data);


// calendar
// GET API
export const googleAddAccountApi = async (data) => await apiClient.getAPICall(apiRoutes.googleAddAccount, data).then(res => res.data);
export const fetchCalendarAccountsApi = async (data) => await apiClient.getAPICall(apiRoutes.fetchCalendarAccounts, data).then(res => res.data);
export const fetchCalendarsApi = async (params, data) => await apiClient.getAPICall(apiRoutes.fetchCalendars(params), data).then(res => res.data);

// PUT API 
export const syncEventsApi = async (params, data) => (await apiClient.postAPICall(apiRoutes.syncEvents(params), data))?.data