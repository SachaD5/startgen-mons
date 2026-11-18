"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, ApiError, type AuthResponse, type User } from "@/lib/api";

const TOKEN_KEY = "startgen_token";

// localStorage peut être indisponible (navigation privée, etc.) : on ne plante jamais à cause de lui
function readToken(): string | null {
    try {
        return window.localStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
}
function saveToken(token: string) {
    try {
        window.localStorage.setItem(TOKEN_KEY, token);
    } catch {}
}
function removeToken() {
    try {
        window.localStorage.removeItem(TOKEN_KEY);
    } catch {}
}

type Status = "loading" | "anonymous" | "authenticated";

type RegisterData = { nom: string; prenom: string; email: string; password: string };

type AuthContextValue = {
    status: Status;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// Garde en mémoire "qui est connecté" pour tout le site.
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [status, setStatus] = useState<Status>("loading");

    // Au chargement du site : s'il y a un jeton enregistré, on demande à l'API qui c'est
    useEffect(() => {
        const token = readToken();
        if (!token) {
            setStatus("anonymous");
            return;
        }
        api<{ user: User }>("/auth/me", { token })
            .then(({ user }) => {
                setUser(user);
                setStatus("authenticated");
            })
            .catch((err) => {
                // Jeton expiré ou invalide : on l'oublie. (Si l'API est juste éteinte, on le garde.)
                if (err instanceof ApiError && err.status === 401) removeToken();
                setStatus("anonymous");
            });
    }, []);

    const startSession = useCallback(({ token, user }: AuthResponse) => {
        saveToken(token);
        setUser(user);
        setStatus("authenticated");
    }, []);

    const login = useCallback(
        async (email: string, password: string) => {
            startSession(await api<AuthResponse>("/auth/login", { body: { email, password } }));
        },
        [startSession],
    );

    const register = useCallback(
        async (data: RegisterData) => {
            startSession(await api<AuthResponse>("/auth/register", { body: data }));
        },
        [startSession],
    );

    const logout = useCallback(() => {
        removeToken();
        setUser(null);
        setStatus("anonymous");
    }, []);

    const value = useMemo(
        () => ({ status, user, login, register, logout }),
        [status, user, login, register, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth doit être utilisé à l'intérieur de <AuthProvider>");
    return ctx;
}
