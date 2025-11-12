import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "../../components/global/LoadingComponents"
import ReactDOM from "react-dom/client";
import "./connexion.css"


export default function Login() {


    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // on vide les anciennes erreurs
        setErrors({});


        try {
            const response = await fetch("http://localhost:8000/users", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            // Si le backend renvoie une erreur
            if (!response.ok) {
                if (data.errors && Array.isArray(data.errors)) {
                    // Convertit le tableau [{ field, message }] en objet { field: message }
                    const fieldErrors: { [key: string]: string } = {};
                    data.errors.forEach((err: any) => {
                        fieldErrors[err.field] = err.message;
                    });
                    setErrors(fieldErrors);
                } else {
                    setErrors({
                        global: "Une erreur inconnue est survenue.",
                    });
                }
                return;
            }

            // Si tout est OK : succès
            setErrors({});
            console.log("Connexio réussie !");

        } catch (err) {
            setErrors({
                global: "Erreur de connexion au serveur.",
            });
        }
    };



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

                    {errors.password && <p className="error" >{errors.password}</p>}


                    {errors.global && <p className="error">{errors.global}</p>}

                    <button>S'inscrire</button>
                </form>
            </div>

        </div>
    );
}