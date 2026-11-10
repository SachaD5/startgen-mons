"use client";

import { useState, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [sujet, setSujet] = useState("evenement");
    const [statut, setStatut] = useState("etudiant");
    const [newsletter, setNewsletter] = useState(true);
    const [message, setMessage] = useState("");
    const [envoye, setEnvoye] = useState(false);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        // Simulation d'envoi du formulaire avec toutes les données
        console.log({ nom, email, sujet, statut, newsletter, message });
        setEnvoye(true);
    }

    return (
        <div className="min-h-screen bg-[#1E1E1E] text-white flex flex-col justify-between">
            <Navbar />

            <main className="max-w-3xl mx-auto px-6 py-16 w-full">
                <div className="text-center mb-12">
          <span className="bg-[#00D9FF]/10 text-[#00D9FF] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block border border-[#00D9FF]/20">
            Support & Échanges
          </span>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
                        Contactez StartGen Mons
                    </h1>
                    <p className="text-gray-400 text-sm max-w-lg mx-auto">
                        Une question sur nos événements, notre antenne ou envie de rejoindre l'aventure ? Remplissez le formulaire ci-dessous.
                    </p>
                </div>

                {envoye ? (
                    <div className="bg-[#00D9FF]/10 border border-[#00D9FF] text-[#00D9FF] p-8 rounded-2xl text-center shadow-xl">
                        <h3 className="font-bold text-xl mb-2">Message envoyé avec succès !</h3>
                        <p className="text-sm text-gray-300 mb-6">Merci pour votre demande. L'équipe de l'antenne de Mons vous recontactera dans les plus brefs délais.</p>
                        <button
                            onClick={() => setEnvoye(false)}
                            className="bg-[#00D9FF] text-[#1E1E1E] font-bold text-sm px-6 py-2.5 rounded-xl transition hover:bg-[#00bfe6]"
                        >
                            Envoyer un autre message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-black/30 border border-white/10 p-8 rounded-2xl shadow-xl space-y-6">

                        {/* Nom et Prénom */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Nom complet</label>
                            <input
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                required
                                placeholder="Ex: Jean Dupont"
                                className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition text-sm"
                            />
                        </div>

                        {/* E-mail */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Adresse e-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Ex: jean.dupont@student.helha.be"
                                className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition text-sm"
                            />
                        </div>

                        {/* Grille pour Sujet et Statut (Sélecteurs / Dropdowns) */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Sujet de votre demande</label>
                                <select
                                    value={sujet}
                                    onChange={(e) => setSujet(e.target.value)}
                                    className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D9FF] transition text-sm"
                                >
                                    <option value="evenement">Participation à un événement</option>
                                    <option value="projet">Partenariat ou Sponsor</option>
                                    <option value="rejoindre">Rejoindre l'antenne de Mons</option>
                                    <option value="autre">Autre question</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Vous êtes ?</label>
                                <select
                                    value={statut}
                                    onChange={(e) => setStatut(e.target.value)}
                                    className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D9FF] transition text-sm"
                                >
                                    <option value="etudiant">Étudiant / Étudiante</option>
                                    <option value="entrepreneur">Jeune Entrepreneur</option>
                                    <option value="professeur">Professeur / Académique</option>
                                    <option value="visiteur">Visiteur externe</option>
                                </select>
                            </div>
                        </div>

                        {/* Zone de texte pour le message */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Votre message</label>
                            <textarea
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                placeholder="Détaillez votre demande ici..."
                                className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition resize-none text-sm"
                            ></textarea>
                        </div>

                        {/* Case à cocher pour la newsletter */}
                        <div className="flex items-center gap-3 pt-2">
                            <input
                                type="checkbox"
                                id="newsletter"
                                checked={newsletter}
                                onChange={(e) => setNewsletter(e.target.checked)}
                                className="w-4 h-4 rounded bg-[#1E1E1E] border-white/20 text-[#00D9FF] focus:ring-[#00D9FF]"
                            />
                            <label htmlFor="newsletter" className="text-xs text-gray-300 cursor-pointer">
                                Je souhaite recevoir les actualités et les prochaines dates d'événements de StartGen Mons par e-mail.
                            </label>
                        </div>

                        {/* Bouton de soumission */}
                        <button
                            type="submit"
                            className="w-full bg-[#00D9FF] hover:bg-[#00bfe6] text-[#1E1E1E] font-bold py-3.5 rounded-xl transition shadow-md text-sm"
                        >
                            Envoyer le message
                        </button>
                    </form>
                )}
            </main>

            <Footer />
        </div>
    );
}
