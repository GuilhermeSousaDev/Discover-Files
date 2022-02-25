import React, { 
    createContext,
    FC, 
    useEffect, 
    useState,
} from 'react';
import api from '../Axios';

interface IUser {
    id: string;
    name: string;
    avatar: string;
}

interface IContext {
    isAuth: boolean;
    token: string | null;
    user: IUser | undefined;
}

const AuthContext = createContext<IContext>({
    isAuth: false,
    token: null,
    user: {
        id: '',
        name: '',
        avatar: '',
    }
});

const AuthProvider: FC = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            (async () => {
                const { data, status } = await api.post('/token', '', {
                    headers: {
                        Authorization: localStorage.getItem('token') as string,
                    }
                });

                if(status !== 200) {
                    setIsAuth(false);
                    setToken(null);
                    setUser(undefined);
                } else {
                    setUser(data);
                    setIsAuth(true);
                    setToken(data.token);
                }
            })();
        } else {
            setIsAuth(false);
            setToken(null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, user, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };