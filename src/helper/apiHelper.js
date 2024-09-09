/**
 * @file /Users/gowtham/code/projects/arametrics/system/client/src/helper/apiHelper.js
 * @author Gowtham <gowtham@aracreate.com>
 * @version 2.0.0
 * @license Apache-2.0
 * @copyright 2024 araCreate GmbH
 */


const Url = {
    // baseApiUrl: "http://localhost:4000",
    baseApiUrl: "/api",
}

const apiRoutes = {
    userRegister: '/auth/register',
    otpVerify: '/auth/otp/verify',
    setPassword: '/auth/set-password',
    otpResend: '/auth/otp/resend',
    forgotPassword: '/auth/forgot-password',
    userLogin: '/auth/login',
    googleLogin: '/auth/google/login',
    googleSignup: '/auth/google/signup',

    // calendar API
    googleAddAccount: '/calendar/google/account',
    fetchCalendarAccounts: '/calendar/account',
    fetchCalendars: (id) => (`/calendar/${id}`),
    syncEvents: (calendarId) => (`/calendar/events/${calendarId}/sync`)
}

export { Url, apiRoutes };

