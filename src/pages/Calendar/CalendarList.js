/**
 * @file /Users/gowtham/code/projects/arametrics/system/client/src/pages/Calendar/CalendarList.js
 * @author Gowtham <gowtham@aracreate.com>
 * @version 2.0.0
 * @license Apache-2.0
 * @copyright 2024 araCreate GmbH
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CollapsibleSection from '../../components/Calendar/CollapsibleSection';
import { fetchCalendarsApi, syncEventsApi } from '../../api/apiRoutes';
import backIcon from "../../assets/images/backIcon.svg";
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/common/CollapsedLoader';

const CalendarList = () => {
    const { id } = useParams();
    const [calendarList, setCalendarList] = useState({});
    const [loading, setLoading] = useState(true);
    const [source, setSource] = useState({});
    const [target, setTarget] = useState({});

    const navigate = useNavigate();

    // const fetchCalendars = async () => {
    //     setLoading(true);

    //     const response = await fetchCalendarsApi(id);
    //     if (response) {
    //         setCalendarList(response?.calendars)
    //     }
    //     setLoading(false);

    // }
    useEffect(() => {
        // fetchCalendars();
        setCalendarList({
            target: [{
                email: "example@aracreate.com",
                id: "1",
                accountId: "q",
                calendar: [{ summary: "Calendar 1", id: '123qwe' }]
            }],
            source: [{
                email: "example1@aracreate.com",
                id: "2",
                accountId: "qnhjj",
                calendar: [{ summary: "Calendar 2", id: '123qwe' }]
            }, {
                email: "example2@aracreate.com",
                id: "2",
                accountId: "qnhjj",
                calendar: [{ summary: "Calendar 3", id: '123qwe' }]
            }]
        })
        setLoading(false)
    }, [id]);

    const handleSourceChange = (selections) => {
        setSource(selections);
        console.log('Selected Items:', selections);
    };

    const handleTargetChange = (selections) => {
        setTarget(selections);
        console.log('Selected Items:', selections);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleSync = async () => {
        const response = await syncEventsApi(target[0].calendar[0], { source });

    }

    return (
        <div className='calendar-list__container'>
            <div className='calendar-list__container_nav'>
                <button className='calendar-list__container_nav_button' onClick={handleBackClick}>
                    <img src={backIcon} alt='back-button' />
                    Back
                </button>
            </div>
            <div className='calendar-list__container_content'>
                <div className='calendar-list__container_content_left'>

                    <CollapsibleSection
                        data={calendarList.target}
                        header="Target Calendar"
                        onSelectionChange={handleTargetChange}
                        initialSelections={[]}
                        singleSelection={true}
                        loading={loading}
                    />

                    <CollapsibleSection
                        data={calendarList.source}
                        header="Source Calendar"
                        onSelectionChange={handleSourceChange}
                        initialSelections={[]}
                        loading={loading}
                    />

                </div>
                {/* <button onClick={handleSync}>sync</button> */}
            </div>
        </div>
    );
};

export default CalendarList;
