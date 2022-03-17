import React, { FC, useEffect, useState } from 'react';
import api from '../../services/Axios';
import { IFile } from '../../interfaces/IFile';
import ListFiles from './files';
import { UlContainer } from './style';

interface IProp {
    category: string;
    type: string;
    file_id: number;
}

const ListFilesByEqualCategoryOrType: FC<IProp> = ({ category, type, file_id }) => {
    const [files, setFiles] = useState<IFile[]>();
    const [typeFiles, setTypeFiles] = useState<IFile[]>();

    useEffect(() => {
        (async () => {
            const { data } = await api.get<IFile[]>(`files/category/${category}`);
            const req = await api.get<IFile[]>(`files/type/${type}`);

            const filterFiles = data.filter(file => file.id !== file_id);
            const filterTypeFiles = req.data.filter(file => file.id !== file_id);

            setFiles(filterFiles);
            setTypeFiles(filterTypeFiles);
        })();
    }, [category, file_id, type]);

    return (
        <UlContainer>
            {files?
                files.map(file => <ListFiles file={file} />)  
                : '...Loading'
            }
            {typeFiles?
                typeFiles.map(file => <ListFiles file={file} />) : ''
            }
        </UlContainer>
    )
}

export default ListFilesByEqualCategoryOrType;