import React, { FC, useContext, useEffect, useState } from 'react';
import { IFile } from '../../interfaces/IFile';
import api from '../../services/Axios';
import { AuthContext } from '../../services/Context';
import ListFiles from './files';

const UserFiles: FC = () => {
    const { user, token } = useContext(AuthContext);
    const [files, setFiles] = useState<IFile[]>();
    
    useEffect(() => {
        (async () => {
            const { data } = await api.get(`files/user/${user?.id}`, {
                headers: {
                    Authorization: token as string,
                }
            });

            setFiles(data);
        })();
    }, [token, user]);

    return (
        <>
            <br />
            <h1>Meus Arquivos</h1>
            {files?
                files.map(file => <ListFiles file={file} />) : ''
            }
        </>
    )
}

export default UserFiles;