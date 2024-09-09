/**
 * @file /Users/gowtham/code/projects/arametrics/system/client/src/components/Calendar/Card.js
 * @author Gowtham <gowtham@aracreate.com>
 * @version 2.0.0
 * @license Apache-2.0
 * @copyright 2024 araCreate GmbH
 */

import React from 'react'
import googleIcon from '../../assets/images/google.svg'

const Card = ({ data, onClick = () => { } }) => {

    return (
        <div className='calendar-account__container_content_card'>
            <div className='calendar-account__container_content_card_header'>
                {<img
                    src={googleIcon}
                    alt='google-profile'
                />}
                <button className="three-dots-button">
                    <span></span>
                </button>
            </div>
            <div className='calendar-account__container_content_card_content' onClick={() => onClick(data)}>
                <h3>{data.displayName}</h3>
                <h4>{data.email}</h4>
            </div>
        </div>
    )
}

export default Card