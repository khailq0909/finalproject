import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import slide1 from "../assets/images/slide1.jpg"

function Login() {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            console.log("token: ",);
            console.log("login success")
            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };
    return (
        <div class="row">
            <div class="col-6 image_login">
                <img src={slide1} alt=""/>
            </div>
            <div class="col-6">
                <div className="login_form">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Username</span>
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" id="username"
                            onChange={handleChange} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Password</span>
                        <input type="text" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" id="password"
                            onChange={handleChange} />
                    </div>
                    <button disabled={loading} onClick={handleClick} className="lButton">
                        Login
                    </button>
                    {error && <span>{error.message}</span>}
                </div>
            </div>
        </div>
    )
}

export default Login