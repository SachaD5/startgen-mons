"use client";

import { useState, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function RegisterPage() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [statut, setStatut] = useState("etudiant");
    const [conditions, setConditions] = useState(false);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!conditions) {
            alert("Veuillez accepter les conditions d'utilisation.");
            return;
        }
        // Simulation d'inscription avec l'ensemble des données
        console.log("Inscription avec :", { nom, prenom, email, password, statut });
        alert("Compte créé avec succès ! Bienvenue dans le réseau StartGen.");
    }

    return (
        <div className="min-h-screen bg-[#1E1E1E] text-white flex flex-col justify-between">
            <Navbar />

            <main className="max-w-xl mx-auto px-6 py-16 w-full">
                <div className="text-center mb-10">
          <span className="bg-[#00D9FF]/10 text-[#00D9FF] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block border border-[#00D9FF]/20">
            Rejoindre le réseau
          </span>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
                        Créer un compte StartGen
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Inscrivez-vous pour participer aux événements et développer vos compétences.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-black/30 border border-white/10 p-8 rounded-2xl shadow-xl space-y-6">

                    {/* Grille Nom et Prénom */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
                            <input
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                required
                                placeholder="Dupont"
                                className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Prénom</label>
                            <input
                                type="text"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                required
                                placeholder="Jean"
                                className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition text-sm"
                            />
                        </div>
                    </div>

                    {/* Adresse e-mail */}
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

                    {/* Statut (corrigé et simplifié) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Votre profil</label>
                        <select
                            value={statut}
                            onChange={(e) => setStatut(e.target.value)}
                            className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D9FF] transition text-sm"
                        >
                            <option value="etudiant">Étudiant / Étudiante</option>
                            <option value="entrepreneur">Jeune Entrepreneur</option>
                            <option value="professionnel">Professionnel / Autre</option>
                        </select>
                    </div>

                    {/* Mot de passe */}
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

                    {/* Conditions d'utilisation */}
                    <div className="flex items-center gap-3 pt-2">
                        <input
                            type="checkbox"
                            id="conditions"
                            checked={conditions}
                            onChange={(e) => setConditions(e.target.checked)}
                            className="w-4 h-4 rounded bg-[#1E1E1E] border-white/20 text-[#00D9FF] focus:ring-[#00D9FF]"
                        />
                        <label htmlFor="conditions" className="text-xs text-gray-300 cursor-pointer">
                            J'accepte les conditions générales d'utilisation et la politique de confidentialité.
                        </label>
                    </div>

                    {/* Bouton de soumission */}
                    <button
                        type="submit"
                        className="w-full bg-[#00D9FF] hover:bg-[#00bfe6] text-[#1E1E1E] font-bold py-3.5 rounded-xl transition shadow-md text-sm"
                    >
                        Créer mon compte
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4">
                        Déjà un compte ?{" "}
                        <Link href="/login" className="text-[#00D9FF] hover:underline font-medium">
                            Se connecter
                        </Link>
                    </p>
                </form>
            </main>

            <Footer />
        </div>
    );
}
