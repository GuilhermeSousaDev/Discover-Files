import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import Files from './pages/Files';
import DownloadFile from './pages/Files/downloadFile';
import Home from './pages/Home';
import Search from './pages/Search';
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
                    <Route path='/files/:id' element={<DownloadFile />} />
                    <Route path='/search' element={<Search />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};