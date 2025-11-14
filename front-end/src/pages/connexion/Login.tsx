import { use, useState } from "react";
import "./connexion.css"


export default function Login() {

    const [formData,setFormData] = useState("");

    async function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        
    }

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        
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

                    {errors.password && <p className="error" >{errors.password}</p>}


                    {errors.global && <p className="error">{errors.global}</p>}

                    <button>S'inscrire</button>
                </form>
            </div>

        </div>
    );
}