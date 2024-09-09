/**
 * @file /Users/gowtham/code/projects/arametrics/system/client/src/components/Layout/Header.js
 * @author Gowtham <gowtham@aracreate.com>
 * @version 2.0.0
 * @license Apache-2.0
 * @copyright 2024 araCreate GmbH
 */

import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie';

import bellIcon from '../../assets/images/bell.svg'
import profileIcon from '../../assets/images/profileIcon.png'
import logout from '../../assets/images/logout.svg'
import settings from '../../assets/images/settings.svg'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMainTab } from '../../redux/features/tabSlice';

const Header = () => {
    const activeItem = useSelector(selectMainTab);
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const modalRef = useRef(null);
    const navigate = useNavigate();


    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setProfileModalOpen(false);
        }
    };

    const handleLogout = () => {
        Cookies.remove('sessionToken');
        navigate('/')

    }

    useEffect(() => {
        if (isProfileModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileModalOpen]);

    return (
        <div className='layout-header'>
            <h1>{activeItem}</h1>
            <div>
                <input type='search' />
                <div className='icon-container'>
                    <img src={bellIcon} alt='bell-icon' />
                </div>
                <div className='image-container' ref={modalRef}>
                    <img
                        src={profileIcon}
                        alt='profile-icon'
                        onClick={() => setProfileModalOpen(!isProfileModalOpen)}
                    />
                    {isProfileModalOpen && (
                        <div className={`image-container__modal ${isProfileModalOpen ? 'open' : ''}`}>
                            <ul>
                                <li><span><img src={settings} alt="settings-icon" />Settings</span></li>
                                <li onClick={handleLogout}><span><img src={logout} alt="logout-icon" />Log Out</span></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header