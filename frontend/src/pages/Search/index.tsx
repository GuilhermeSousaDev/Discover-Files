import React, { 
    FC, 
    useState, 
    useEffect,
} from 'react';
import ListFiles from '../../components/List/files';
import Navbar from '../../components/Navbar';
import { IFile } from '../../interfaces/IFile';
import api from '../../services/Axios';
import { Container, UlContainer } from './style';

const Search: FC = () => {
    const [data, setData] = useState<IFile[]>();
    const [param, setParam] = useState<string>();

    useEffect(() => {
        (async () => {
            if(param) {
                const request = await api.get(`files/search/${param}`);

                setTimeout(() => setData(request.data), 2000);
            }
        })();
    }, [param]);

    return (
        <>
            <Navbar/>
            <Container>
                <input 
                    onChange={e => setParam(e.target.value)}
                    type="text" 
                    placeholder="Search..."
                />
                <UlContainer>
                    {!data && param?
                        '...Loading': 
                        param?
                            data?.map(file => 
                                <ListFiles file={file} />
                            ) : ''
                    }
                </UlContainer>
                
            </Container>
        </>
    )
}

export default Search;