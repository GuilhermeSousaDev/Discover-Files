import React, { 
    FC, 
    useState, 
    useEffect,
} from 'react';
import ListFiles from '../../components/List/files';
import Navbar from '../../components/Navbar';
import api from '../../services/Axios';
import { Container, UlContainer } from './style';

interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: string
    createdAt: Date;
    updatedAt: Date;
}

interface IData {
    id: number;
    name: string;
    file: string;
    description: string;
    type: string;
    category: string;
    user: IUser;
    createdAt: Date;
    updatedAt: Date;
}

const Search: FC = () => {
    const [data, setData] = useState<IData[]>();
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