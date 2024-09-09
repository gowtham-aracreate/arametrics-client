/**
 * @file /Users/gowtham/code/projects/arametrics/system/client/src/pages/Calendar/CalendarAccounts.js
 * @author Gowtham <gowtham@aracreate.com>
 * @version 2.0.0
 * @license Apache-2.0
 * @copyright 2024 araCreate GmbH
 */

import React, { useEffect, useState } from 'react'
import { fetchCalendarAccountsApi, fetchCalendarsApi, googleAddAccountApi } from '../../api/apiRoutes'
import plusIcon from '../../assets/images/plusIcon.svg'
import { isEmptyArray } from '../../util/utils';
import Card from '../../components/Calendar/Card';
import { useNavigate } from 'react-router-dom';
import ComponentLoader from '../../components/common/ComponentLoader';
// import useApi from '../../hooks/useApi'

const CalendarAccounts = () => {
    // const { data, loading, error, statusCode } = useApi(fetchCalendarAccountsApi())
    // const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const accounts = [{ displayName: "Aravinth", email: "example@aracreate.com" }, { displayName: "Gowtham", email: "example1@aracreate.com" }];

    // const fetchAccounts = async () => {
    //     setLoading(true);
    //     const response = await fetchCalendarAccountsApi();
    //     if (response) {
    //         setAccounts(response.accounts ? response.accounts : []);
    //     }
    //     setLoading(false);
    // }
    // useEffect(() => {
    //     fetchAccounts()
    // }, [])

    const handleAddAccount = async () => {
        const response = await googleAddAccountApi();
        if (response) {
            window.location.href = response.url;
        }
    }

    const handleAccount = (data) => {
        navigate(`/calendar/234234jhiuhuk`)
    }
    return (
        <div className='calendar-account__container'>
            <div className='calendar-account__container_header'>
                <button ><img src={plusIcon} />Add New Account</button>
            </div>
            {
                loading ? (<ComponentLoader />) : (
                    <div className='calendar-account__container_content'>
                        {

                            !isEmptyArray(accounts) ? accounts.map((item, i) => (
                                <Card key={i} data={item} onClick={(data) => handleAccount(data)} />
                            )) : (<div>No accounts found.</div>)

                        }


                    </div>
                )
            }

        </div>
    )
}

export default CalendarAccounts