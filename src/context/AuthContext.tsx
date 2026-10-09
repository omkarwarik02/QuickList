import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { checkUser } from "@/utils/checkUser";
type AuthContextType = {
    user: User | null;
    loading: boolean;
    // Call right before signing in from the login screen, which creates the Mongo user itself
    markSigningIn: () => void;
};

const AuthContext = createContext<AuthContextType>({user:null, loading:true, markSigningIn: () => {}});

export function AuthProvider({ children } : { children: ReactNode}){
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    // True while login.tsx is signing in: its syncUser() may not have created the
    // Mongo user yet, so checkUser() would wrongly report "not found"
    const isManualSignIn = useRef(false);

    const markSigningIn = () => {
        isManualSignIn.current = true;
    };



    useEffect(()=>{
     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser)=>{
        if(!firebaseUser){
            setUser(null);
            setLoading(false)
            return
        }
        if(isManualSignIn.current){
            isManualSignIn.current = false;
            setUser(firebaseUser);
            setLoading(false);
            return;
        }
        try{
            const mongoUser = await checkUser();
            if(!mongoUser){
                await signOut(auth);
                setUser(null);
            } else {
                setUser(firebaseUser);
            }

        }catch(error){
            
            console.error("Auth check failed:", error);
            setUser(firebaseUser);

        } finally {
            setLoading(false);
        }
     });
     return unsubscribe;
    },[]);

    return (
        <AuthContext.Provider value={{user, loading, markSigningIn}}>
                {children}
        </AuthContext.Provider>
    );

}

export function useAuth(){
    return useContext(AuthContext);
}