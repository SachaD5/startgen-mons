"use client";

import { useState, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        // Simulation de connexion (intégration future avec le JWT / API)
        console.log("Connexion avec :", { email, password });
        alert("Connexion simulée avec succès !");
    }

    return (
        <div className="min-h-screen bg-[#1E1E1E] text-white flex flex-col justify-between">
            <Navbar />

            <main className="max-w-md mx-auto px-6 py-16 w-full">
                <div className="text-center mb-10">
          <span className="bg-[#00D9FF]/10 text-[#00D9FF] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block border border-[#00D9FF]/20">
            Espace Membre
          </span>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
                        Connexion à StartGen
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Accédez à votre espace et gérez vos événements.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-black/30 border border-white/10 p-8 rounded-2xl shadow-xl space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Adresse e-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="nom@exemple.be"
                            className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#00D9FF] hover:bg-[#00bfe6] text-[#1E1E1E] font-bold py-3.5 rounded-xl transition shadow-md text-sm"
                    >
                        Se connecter
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4">
                        Pas encore de compte ?{" "}
                        <Link href="/register" className="text-[#00D9FF] hover:underline font-medium">
                            S'inscrire
                        </Link>
                    </p>
                </form>
            </main>

            <Footer />
        </div>
    );
}
