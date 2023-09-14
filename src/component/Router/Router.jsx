import React, { useState } from 'react'
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import RouteTable from './RouteTable';
import RouteForm from './RouteForm';
function Router() {
 
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to="/form"/>}></Route>
                <Route path='/form' element={<RouteForm />}>
                    <Route path=':id' element={<RouteForm/>}/>
                </Route>
                <Route path='/table' element={<RouteTable />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router