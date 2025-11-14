import { useNavigate } from "react-router";
import "./connexion.css";
import { useState } from "react";


export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [success, setSuccess] = useState("")


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
        console.log(formData);

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8000/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                const formattedErrors: Record<string, string> = {}; //permet de faire { string : "" , string: ""}
                data.errors.forEach((err: any) => {
                    formattedErrors[err.field] = err.message
                })
                setErrors(formattedErrors)
                setSuccess("");
                return;
            }
            
            console.log("inscription réussi");
            setSuccess("Inscription réussi!");
            setTimeout(() => {
                navigate("/login")
            }, 1000)
            setErrors({});

        } catch (err) {
            console.log(err);
            setErrors({
                global: "Erreur de connexion au serveur"
            })
        }
    }


    return (
        <div className="register">
            <div className="auth">
                <h2>Inscription</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form_input"
                            onChange={handleChange}
                            placeholder=" "
                            autoComplete="name"
                        />
                        <label htmlFor="name" className="form_label">Name</label>
                    </div>

                    {errors.name && <p className="error">{errors.name}</p>}

                    <div className="form">
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            className="form_input"
                            onChange={handleChange}
                            placeholder=" "
                            autoComplete="family-name"
                        />
                        <label htmlFor="lastname" className="form_label">Nom</label>
                    </div>

                    {errors.lastname && <p className="error">{errors.lastname}</p>}

                    <div className="form">
                        <input
                            type="text"
                            name="username"
                            id="pseudo"
                            className="form_input"
                            onChange={handleChange}
                            placeholder=" "
                            autoComplete="username"
                        />
                        <label htmlFor="pseudo" className="form_label">Pseudo</label>
                    </div>

                    {errors.username && <p className="error">{errors.username}</p>}

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

                    {errors.password && <p className="error" >{errors.password}</p>}

                    <div className="form">
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="form_input"
                            onChange={handleChange}
                            placeholder=" "
                            autoComplete="new-password"
                        />
                        <label htmlFor="confirmPassword" className="form_label">Confirmer</label>
                    </div>

                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    {errors.global && <p className="error">{errors.global}</p>}
                    {success && <p className="success">{success}</p>}

                    <button>S'inscrire</button>
                </form>
            </div>

        </div>
    );
}
