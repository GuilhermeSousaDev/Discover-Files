import React, { FC, useEffect, useState } from 'react';
import api from '../../services/Axios';
import { IFile } from '../../interfaces/IFile';
import ListFiles from './files';
import { UlContainer } from './style';

interface IProp {
    category: string;
    file_id: number;
}

const ListFilesByEqualCategory: FC<IProp> = ({ category, file_id }) => {
    const [files, setFiles] = useState<IFile[]>();

    useEffect(() => {
        (async () => {
            const { data } = await api.get<IFile[]>(`files/category/${category}`);

            const filterFiles = data.filter(file => file.id !== file_id);

            setFiles(filterFiles);
        })();
    }, [category, file_id]);

    return (
        <UlContainer>
            {files?
                files.map(file => <ListFiles file={file} />) : '...Loading'
            }
        </UlContainer>
    )
}

export default ListFilesByEqualCategory;