import React, { 
    createContext,
    FC, 
    useEffect, 
    useState,
} from 'react';

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
            setToken(localStorage.getItem('token'));
            setIsAuth(true);
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