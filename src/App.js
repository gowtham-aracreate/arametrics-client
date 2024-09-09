/**
 * @file /Users/gowtham/code/projects/arametrics/system/client/src/App.js
 * @author Gowtham <gowtham@aracreate.com>
 * @version 2.0.0
 * @license Apache-2.0
 * @copyright 2024 araCreate GmbH
 */

/******************************************************
 * Author      : Gowtham
 * Description : This is an Arametrics.
 * licencse    : Apache-2.0
*******************************************************/

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthRoutes from './routes/AuthRoutes';
import { Provider } from 'react-redux'
import { ToastNotification } from './util/toaster';
import ProtectedRoute from './routes/ProtectedRoute';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';

const CalendarPage = React.lazy(() => import('./pages/Calendar'));
const CalendarAccounts = React.lazy(() => import('./pages/Calendar/CalendarAccounts'));
const CalendarList = React.lazy(() => import('./pages/Calendar/CalendarList'));


function App() {
  // const isAuthenticated = true;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ToastNotification />
          <Suspense fallback={<div className='loader-background'><div class="dots"></div></div>}>
            <Routes>
              <Route path="/*" element={<AuthRoutes />} />


              {/* Protected Routes */}
              {/* <Route element={<ProtectedRoute />}> */}
              <Route path="/calendar/*" element={<CalendarPage />} >
                <Route path="account" element={<CalendarAccounts />} />
                <Route path="update" element={<div>hi</div>} />
                <Route path=":id" element={<CalendarList />} />
              </Route>

              <Route path="/home/*" element={<CalendarPage />} />
              <Route path="/time-tracker/*" element={<CalendarPage />} />
              <Route path="/projects/*" element={<CalendarPage />} />
              {/* </Route> */}
            </Routes>
          </Suspense>
        </Router>
      </PersistGate>

    </Provider>

  );
}

export default App;
