import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import Files from './pages/Files';
import Home from './pages/Home';
import Upload from './pages/Upload';

export default function Router() {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/upload' element={<Upload />} />
                    <Route path='/files' element={<Files />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};