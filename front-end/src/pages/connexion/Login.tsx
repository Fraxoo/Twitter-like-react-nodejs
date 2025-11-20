import { useState } from "react";
import "./connexion.css"
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function Login() {

    const { setUser } = useAuth();

    const navigate = useNavigate();

    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,[e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccess("");
        setErrors({});
        try {

            const res = await fetch("http://localhost:8000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            const data = await res.json();

            if (!res.ok) {
                const formattedErrors: Record<string, string> = {};
                data.errors.forEach((err: any) => {
                    formattedErrors[err.field] = err.message;
                });
                return
            }

            setUser(data)
            setSuccess("Connexion réussi!");
            setTimeout(() => {
                navigate("/home")
            }, 1000);
        } catch (err) {
            setErrors({ global: "Erreur veuillez reesayer " });
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