import { useNavigate } from "react-router";

export default function GoBackComponenet() {
	const navigate = useNavigate();
	function goBack() {
		navigate(-1);
	}

	return (
		<div className="go-back-button" onClick={goBack}>
			<i className="fa-solid fa-arrow-left"></i>
		</div>
	);
}
