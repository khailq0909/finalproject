import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import slide1 from "../assets/images/slide1.jpg";

function Login() {
    const [credentials, setCredentials] = useState({
        password: undefined,
        username: undefined,
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
            console.log("login success");
            navigate("/");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };
    return (
        
        <section className="vh-100" style={{ backgroundColor: "#F6F9FA" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: "1rem" }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src={slide1}
                                        alt="login form" className="img-fluid w-100 h-100 object-fit-cover" style={{ borderRadius: "1rem 0 0 1rem" }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form>

                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                                                <span className="h1 fw-bold mb-0">MyHome Stay</span>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form2Example17">UserName</label>
                                                <input type="email" id="username" className="form-control form-control-lg" onChange={handleChange} />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form2Example27">Password</label>
                                                <input type="password" id="password" className="form-control form-control-lg" onChange={handleChange} />
                                            </div>
                                            {error && <span>{error.message}</span>}
                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-primary btn-lg btn-block" type="button" disabled={loading} onClick={handleClick}>Sign in</button>
                                            </div>

                                            
                                            <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account? <Link
                                                className="text-primary" to="/register">Register here</Link></p>
                                
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Login