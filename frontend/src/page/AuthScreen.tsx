import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import Logo from "../component/Logo";
import {AuthContext} from "../context/AuthContext";

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
			if (success) navigate("/");
		} else {
			const success = await authContext.register(username, email, password);
			if (success) setIsLogin(true);
		}
	};

	return (
		<div className="mt-32">
			<Logo size="large" />

			<div style={{maxWidth: "500px", margin: "0 auto"}}>
				<h2 className="text-2xl font-semibold text-center mb-6 mt-2">{isLogin ? "Login" : "Register"}</h2>
				<form onSubmit={handleSubmit}>
					<div style={{marginBottom: "15px"}}>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							style={{width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ccc"}}
							placeholder="Enter your username"
							autoComplete="username"
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
					</div>

					{!isLogin && (
						<div style={{marginBottom: "15px"}}>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								style={{width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ccc"}}
								autoComplete="email"
								placeholder="Enter your email"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
					)}

					<div style={{marginBottom: "15px"}}>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							autoComplete="current-password"
							style={{width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ccc"}}
							placeholder="Enter your password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>

					<button
						type="submit"
						style={{
							width: "100%",
							padding: "10px",
							backgroundColor: "blue",
							color: "white",
							border: "none",
							marginBottom: "15px",
						}}>
						{isLogin ? "Login" : "Register"}
					</button>
				</form>
				<p style={{textAlign: "center"}}>
					{isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
					<button
						type="button"
						onClick={() => setIsLogin(!isLogin)}
						style={{color: "blue", background: "none", border: "none", cursor: "pointer"}}>
						{isLogin ? "Register" : "Login"}
					</button>
				</p>
				<p style={{textAlign: "center"}}>
					<button
						type="button"
						onClick={() => navigate("/")}
						style={{color: "blue", background: "none", border: "none", cursor: "pointer"}}>
						Go back to home
					</button>
				</p>
			</div>
		</div>
	);
}
