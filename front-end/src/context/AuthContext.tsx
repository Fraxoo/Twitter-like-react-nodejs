import { createContext, useContext, useEffect, useState } from "react";


type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Charger le user au rafraîchissement de la page
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("http://localhost:8000/users/me", {
          credentials: "include",
        });
        
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          const data = await res.json();
          console.log(data);
          
        }
      } catch (err) {
        console.error("Erreur /me :", err);
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  async function logout() {
    await fetch("http://localhost:8000/users/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook pratique
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return ctx;
}
