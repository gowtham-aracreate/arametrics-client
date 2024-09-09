/**
 * @file /Users/gowtham/code/projects/arametrics/system/client/src/components/Calendar/CollapsibleSection.js
 * @author Gowtham <gowtham@aracreate.com>
 * @version 2.0.0
 * @license Apache-2.0
 * @copyright 2024 araCreate GmbH
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import backIcon from '../../assets/images/backIcon.svg';
import googleIcon from '../../assets/images/google.svg';
import CollapsedLoader from '../common/CollapsedLoader';

const CollapsibleSection = ({ data = [], header, onSelectionChange, initialSelections = [], loading = false, singleSelection = false }) => {
    const [collapsedSections, setCollapsedSections] = useState({});
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

    // Initialize state with initial selections
    useEffect(() => {
        const initialSelectionState = {};
        initialSelections.forEach(({ accountId, calendar }) => {
            const sectionIndex = data.findIndex(section => section.id === accountId);
            if (sectionIndex !== -1) {
                calendar.forEach(cal => {
                    const calendarIndex = data[sectionIndex].calendar.findIndex(item => item.id === cal);
                    if (calendarIndex !== -1) {
                        initialSelectionState[`${sectionIndex}-${calendarIndex}`] = true;
                    }
                });
            }
        });
        setSelectedCheckboxes(initialSelectionState);
    }, []);

    const toggleCollapse = (index) => {
        setCollapsedSections(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleCheckboxChange = (sectionIndex, calendarIndex, isChecked) => {
        setSelectedCheckboxes(prevState => {
            let newState = {
                ...prevState
            };

            if (singleSelection) {
                newState = {};
            }

            newState[`${sectionIndex}-${calendarIndex}`] = isChecked;

            const updatedSelections = data?.map((section, idx) => {
                if (section?.calendar?.some((item) => newState[`${idx}-${item.id}`])) {
                    return {
                        accountId: section.id,
                        calendar: section.calendar?.filter((item) => newState[`${idx}-${item.id}`]).map(cal => cal.id)
                    };
                }
                return null;
            }).filter(Boolean);

            if (onSelectionChange) {
                onSelectionChange(updatedSelections);
            }

            return newState;
        });
    };

    const calculateMaxHeight = () => {
        const openSections = Object.values(collapsedSections).filter(isOpen => isOpen).length;
        return `${openSections * 250}px`;
    };

    return (
        <div className='calendar-list__container_content_left_collapsed'>
            <div className='calendar-list__container_content_left_collapsed_header'>
                {header}
            </div>
            {loading ? (
                <CollapsedLoader />
            ) : (
                data?.map((section, index) => (
                    <div key={index}>
                        <button
                            className='calendar-list__container_content_left_collapsed_toggle'
                            onClick={() => toggleCollapse(index)}
                        >
                            <span>
                                <img alt='google-icon' src={googleIcon} />
                                {section.email}
                            </span>
                            <img
                                src={backIcon}
                                alt='toggle'
                                className={collapsedSections[index] ? 'hide' : 'show'}
                            />
                        </button>
                        <div
                            className={`calendar-list__container_content_left_collapsed ${collapsedSections[index] ? 'expanded' : 'collapsed'}`}
                        >
                            <div className='calendar-list__container_content_left_collapsed_container' style={{ maxHeight: calculateMaxHeight() === '0px' ? 'auto' : calculateMaxHeight() }}>
                                {section?.calendar?.map((cal, calIdx) => {
                                    const checkboxId = `checkbox-${index}-${cal.id}`;
                                    return (
                                        <div key={calIdx}>
                                            <input
                                                type='checkbox'
                                                id={checkboxId}
                                                checked={!!selectedCheckboxes[`${index}-${cal.id}`]}
                                                onChange={(e) => handleCheckboxChange(index, cal.id, e.target.checked)}
                                            />
                                            <label htmlFor={checkboxId}>{cal.summary}</label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))
            )}

        </div>
    );
};

CollapsibleSection.propTypes = {
    data: PropTypes.array,
    header: PropTypes.string.isRequired,
    onSelectionChange: PropTypes.func,
    initialSelections: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    singleSelection: PropTypes.bool
};

export default CollapsibleSection;
