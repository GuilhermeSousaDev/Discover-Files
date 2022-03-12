import React, { 
    FC, 
    useEffect, 
    useState,
} from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/Axios';
import { Container, InitialDiv, Title } from './style';

const CategoryFiles: FC = () => {
    const [category, setCategory] = useState<string>('app');
    
    useEffect(() => {
        (async () => {
            const request = await api.get(`files/category/${category}`);

            console.log(request);
        })();
    }, [category]);

    return (
        <>
            <Navbar />
            <Container>
                <InitialDiv>
                    <Title>List Files By Category</Title>

                    <select onChange={e => setCategory(e.target.value)} defaultValue="Other">
                        <option value="App">App</option>
                        <option value="Image">Image</option>
                        <option value="Video">Video</option>
                        <option value="Book">Book</option>
                        <option value="pdf">PDF</option>
                        <option value="Other">Other</option>
                    </select>   
                </InitialDiv>
            </Container>
        </>
    )
}

export default CategoryFiles;