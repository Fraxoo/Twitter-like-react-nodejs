import { useState } from "react";
import { useNavigate } from "react-router";
import "./connexion.css";
import Swal from "sweetalert2";
import Loading from "../../components/global/LoadingComponents"
import ReactDOM from "react-dom/client";


export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        if (confirmPassword !== formData.password) {
            setErrors({
                confirmPassword: "Les mots de passe ne correspondent pas.",
            });
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/users", {
                method: "POST",
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
            console.log("Inscription réussie !");
            // ton composant

            Swal.fire({
                title: "Inscription réussie !",
                html: `
    <p style="color:#fff;margin-top:6px;">
      Vous allez être redirigé vers la page de connexion.
    </p>
    <div id="custom-loader" style="margin-top:16px;"></div>
  `,
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                background: "#0b0b0c",
                color: "#ffffff",
                iconColor: "#6ea8fe",
                backdrop: "rgba(0,0,0,0.6)",
                customClass: {
                    popup: "swal-dark-popup",
                    title: "swal-dark-title",
                },
                didOpen: () => {
                    const container = document.getElementById("custom-loader");
                    if (container) {
                        const root = ReactDOM.createRoot(container);
                        root.render(<Loading />);
                    }
                },
            }).then(() => {
                navigate("/login");
            });



        } catch (err) {
            setErrors({
                global: "Erreur de connexion au serveur.",
            });
        }
    };



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
                            name="confirm-password"
                            id="confirm-password"
                            className="form_input"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder=" "
                            autoComplete="new-password"
                        />
                        <label htmlFor="confirm-password" className="form_label">Confirmer</label>
                    </div>

                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    {errors.global && <p className="error">{errors.global}</p>}

                    <button>S'inscrire</button>
                </form>
            </div>

        </div>
    );
}
