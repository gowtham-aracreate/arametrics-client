/**
 * @file /Users/gowtham/code/projects/arametrics/system/client/src/components/Layout/SideBar.js
 * @author Gowtham <gowtham@aracreate.com>
 * @version 2.0.0
 * @license Apache-2.0
 * @copyright 2024 araCreate GmbH
 */

import React, { useEffect } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { Book } from './icon';
import bigLogo from '../../assets/images/bigLogo.svg';
import { selectMainTab, setMainTab } from '../../redux/features/tabSlice';

const tabToRoute = {
    Home: '/home',
    Calendar: '/calendar/account',
    Tracker: '/time-tracker',
    Projects: '/projects',
};

const routeToTab = {
    '/home': 'Home',
    '/calendar': 'Calendar',
    '/time-tracker': 'Tracker',
    '/projects': 'Projects',
};

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const activeItem = useSelector(selectMainTab);

    useEffect(() => {
        // Extract the primary route segment
        const primaryRoute = `/${location.pathname.split('/')[1]}`;
        const currentTab = routeToTab[primaryRoute] || 'Home';
        if (activeItem !== currentTab) {
            dispatch(setMainTab(currentTab));
        }
    }, [location.pathname, activeItem, dispatch]);

    const handleMenuItemClick = (tabName) => {
        dispatch(setMainTab(tabName));
        navigate(tabToRoute[tabName]);
    };

    return (
        <div className='sidebar__container'>
            <Sidebar className='sidebar-root' breakPoint='md'>
                <div className='header'>
                    <img src={bigLogo} alt="Logo" />
                </div>
                <Menu className='sidebar-root__menu'>
                    <MenuItem
                        className={`sidebar-root__menu_submenu ${activeItem === 'Home' ? 'active' : ''}`}
                        icon={<Book />}
                        onClick={() => handleMenuItemClick('Home')}
                    >
                        Home
                    </MenuItem>
                    <MenuItem
                        className={`sidebar-root__menu_submenu ${activeItem === 'Calendar' ? 'active' : ''}`}
                        icon={<Book />}
                        onClick={() => handleMenuItemClick('Calendar')}
                    >
                        Calendar
                    </MenuItem>
                    <MenuItem
                        className={`sidebar-root__menu_submenu ${activeItem === 'Tracker' ? 'active' : ''}`}
                        icon={<Book />}
                        onClick={() => handleMenuItemClick('Tracker')}
                    >
                        Time Tracker
                    </MenuItem>
                    <MenuItem
                        className={`sidebar-root__menu_submenu ${activeItem === 'Projects' ? 'active' : ''}`}
                        icon={<Book />}
                        onClick={() => handleMenuItemClick('Projects')}
                    >
                        Projects
                    </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
};

export default SideBar;
