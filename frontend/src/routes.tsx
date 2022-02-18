import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';

export default function Router() {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};