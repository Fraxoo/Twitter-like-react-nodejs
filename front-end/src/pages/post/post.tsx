import { useState } from "react";
import "./post.css"
import { useNavigate } from "react-router";

export default function CreatePost() {

    const navigate = useNavigate();

    const [success, setSuccess] = useState("")
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState({
        content: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setSuccess("");
        try {
            const res = await fetch("http://localhost:8000/post/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData)
            })

            const data = await res.json();
            console.log(data);

            if(!res.ok){
                const formattedErrors: Record<string,string> = {};
                data.errors.forEach((err : any) => {
                    formattedErrors[err.field] = err.message
                });
                setErrors(formattedErrors);
                return;
            }

            

            setSuccess("Post ajouté avec succés!");
            setTimeout(() => {
                navigate("/home");
            }, 1000);
        } catch (err) {
            setErrors({ global: "Erreur veuillez réesayer" })
        }
    }


    return (


        <div className="post-container">
            <h1>Ajoutez un post</h1>
            <form className="post-form" action="" onSubmit={handleSubmit} >
                <input className="post-form-input" type="text" placeholder="Quoi de neuf?" name="content" onChange={handleChange} />
                <button>Ajoutez</button>
            </form>
            {errors.content && <p className="error">{errors.content}</p>}
            {errors.global && <p className="error">{errors.global}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    )
}