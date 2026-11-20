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
type ProfileData = { nom: string; prenom: string; email: string };

type AuthContextValue = {
    status: Status;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    /** Modifie nom, prénom et e-mail du compte connecté. Renvoie le profil à jour. */
    updateProfile: (data: ProfileData) => Promise<User>;
    /** Change le mot de passe (l'ancien est obligatoire). */
    changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
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

    // Appel à l'API avec le jeton de la session. Si la session a expiré (401), on déconnecte proprement.
    const authed = useCallback(
        async function <T>(path: string, options: { method: string; body?: unknown }): Promise<T> {
            const token = readToken();
            if (!token) {
                logout();
                throw new ApiError("Ta session a expiré. Reconnecte-toi.", 401);
            }
            try {
                return await api<T>(path, { ...options, token });
            } catch (err) {
                if (err instanceof ApiError && err.status === 401) logout();
                throw err;
            }
        },
        [logout],
    );

    const updateProfile = useCallback(
        async (data: ProfileData) => {
            const { user } = await authed<{ user: User }>("/auth/me", { method: "PATCH", body: data });
            setUser(user);
            return user;
        },
        [authed],
    );

    const changePassword = useCallback(
        async (currentPassword: string, newPassword: string) => {
            await authed<void>("/auth/me/password", { method: "PUT", body: { currentPassword, newPassword } });
        },
        [authed],
    );

    const value = useMemo(
        () => ({ status, user, login, register, logout, updateProfile, changePassword }),
        [status, user, login, register, logout, updateProfile, changePassword],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth doit être utilisé à l'intérieur de <AuthProvider>");
    return ctx;
}
