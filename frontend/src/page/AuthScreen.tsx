import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            const success = await authContext.login(username, password);
            if (success)
                navigate('/');

        } else {
            const success = await authContext.register(username, email, password);
            if (success)
                setIsLogin(true);
        }
    }

    return (
        <div>
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}></div>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{isLogin ? "Login" : "Register"}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Username</label>
                    <input
                        type="text"
                        style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc' }}
                        placeholder="Enter your username"
                        value={username} 
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                
                {!isLogin && (
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email</label>
                        <input
                            type="email"
                            style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc' }}
                            placeholder="Enter your email"
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                )}
                
                <div style={{ marginBottom: '15px' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc' }}
                        placeholder="Enter your password"
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                
                <button
                    type="submit"
                    style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', marginBottom: '15px' }}>
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>
            <p style={{ textAlign: 'center' }}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>
                    {isLogin ? "Register" : "Login"}
                </button>
            </p>
        </div>
    );
}