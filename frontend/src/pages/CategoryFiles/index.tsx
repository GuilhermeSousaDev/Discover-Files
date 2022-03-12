import React, { 
    FC, 
    useEffect, 
    useState,
} from 'react';
import ListFiles from '../../components/List/files';
import Navbar from '../../components/Navbar';
import api from '../../services/Axios';
import { IFile } from '../../interfaces/IFile';
import { Container, InitialDiv, Title, UlContainer } from './style';

const CategoryFiles: FC = () => {
    const [category, setCategory] = useState<string>('app');
    const [files, setFiles] = useState<IFile[]>();
    
    useEffect(() => {
        (async () => {
            const { data } = await api.get(`files/category/${category}`);

            setFiles(data);
        })();
    }, [category]);

    return (
        <>
            <Navbar />
            <Container>
                <InitialDiv>
                    <Title>List Files By Category</Title>

                    <select onChange={e => setCategory(e.target.value)} defaultValue="App">
                        <option value="App">App</option>
                        <option value="Image">Image</option>
                        <option value="Video">Video</option>
                        <option value="Book">Book</option>
                        <option value="pdf">PDF</option>
                        <option value="Other">Other</option>
                    </select>   
                </InitialDiv>

                <UlContainer>
                    {files?
                        files.map(file => 
                            <ListFiles file={file} />
                        ): '...Loading'
                    }
                </UlContainer>
            </Container>
        </>
    )
}

export default CategoryFiles;