import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ApiForm from './ApiForm'
import ApiTable from './ApiTable'

function ApiRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to='/apiForm' />} />
                <Route path='/apiForm' element={<ApiForm />} >
                    <Route path=':id' element={<ApiForm />} />
                </Route>
                <Route path='/apiTable' element={<ApiTable />} />
            </Routes>
        </BrowserRouter>
    )
}

export default ApiRouter