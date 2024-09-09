import React from 'react'
import SideBar from '../components/Layout/SideBar'
import Header from '../components/Layout/Header'

const MainLayout = ({ children }) => {
    return (
        <div className='main-layout'>
            <SideBar />
            <div className='main-layout__container' >
                <Header />
                <div className='main-layout__content' >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MainLayout