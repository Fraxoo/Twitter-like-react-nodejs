import { useState } from "react";
import "./connexion.css"
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";


export default function Login() {

    const navigate = useNavigate();

    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState({});


    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        })
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                const formattedErrors: Record<string, string> = {}
                data.errors.forEach((err: any) => {
                    formattedErrors[err.field] = err.message
                })
                setErrors(formattedErrors);
                setSuccess("");
                return;
            }

            setSuccess("Connexion réussi!");
            setTimeout(() => {
                navigate("/home")
            }, 1000)
            setErrors({});

        } catch (err) {
            setErrors({
                global: "Erreur serveur"
            })
        }
    }

    return (
        <div className="login">
            <div className="auth">
                <h2>Connexion</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form_input"
                            onChange={handleChange}
                            placeholder=" "
                            autoComplete="email"
                        />
                        <label htmlFor="email" className="form_label">Email</label>
                    </div>

                    {errors.email && <p className="error">{errors.email}</p>}

                    <div className="form">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form_input"
                            onChange={handleChange}
                            placeholder=" "
                            autoComplete="new-password"
                        />
                        <label htmlFor="password" className="form_label">Mot de passe</label>
                    </div>

                    <p>Pas encore de compte ? <Link to={"/register"}>Inscrivez-vous</Link></p>

                    {errors.password && <p className="error" >{errors.password}</p>}
                    {errors.global && <p className="error">{errors.global}</p>}
                    {success && <p className="success">{success}</p>}

                    <button>Se connecter</button>
                </form>
            </div>

        </div>
    );
}