import React, { createContext, useState, useEffect, ReactNode } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export type UserRole = 'admin' | 'customer' | null;

interface AuthContextType {
    user: FirebaseAuthTypes.User | null;
    userRole: UserRole;
    authLoading: boolean;
    signIn: (email: string, password: string) => Promise<{ role: UserRole }>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [userRole, setUserRole] = useState<UserRole>(null);
    const [authLoading, setAuthLoading] = useState(true);

    const getRoleForUser = async (uid: string): Promise<UserRole> => {
        try {
            const userDoc = await firestore().collection('users').doc(uid).get();
            const role = userDoc.data()?.role as UserRole;
            return role ?? 'customer';
        } catch {
            return 'customer';
        }
    };

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                try {
                    const userDoc = await firestore().collection('users').doc(firebaseUser.uid).get();
                    const role = userDoc.data()?.role as UserRole;
                    setUserRole(role ?? 'customer');
                } catch {
                    setUserRole('customer');
                }
            } else {
                setUserRole(null);
            }
            setAuthLoading(false);
        });
        return unsubscribe;
    }, []);

    const signIn = async (email: string, password: string) => {
        const userCredential = await auth().signInWithEmailAndPassword(email.trim(), password);
        const role = await getRoleForUser(userCredential.user.uid);
        return { role };
    };

    const signOut = async () => {
        await auth().signOut();
        setUser(null);
        setUserRole(null);
    };

    const value: AuthContextType = {
        user,
        userRole,
        authLoading,
        signIn,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
