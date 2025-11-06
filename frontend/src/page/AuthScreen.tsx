import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import FloatingInput from "../component/Atom/FloatingInput";
import Layout from "../component/Layout/Layout";
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
		<Layout header={isLogin ? "Login" : "Register"} hideNavbar={true}>
			<div className="max-w-[500px] mx-auto">
				<form onSubmit={handleSubmit} className="flex flex-col items-center">
					<div className="my-4 w-full">
						<FloatingInput type="text" label="Username" state={username} setState={setUsername} />
					</div>

					{!isLogin && (
						<div className="my-4 w-full">
							<FloatingInput type="email" label="Email" state={email} setState={setEmail} />
						</div>
					)}

					<div className="my-4 w-full">
						<FloatingInput type="password" label="Password" state={password} setState={setPassword} />
					</div>

					<button
						type="submit"
						className="w-[80%] p-2.5 bg-simon-blue text-white border-none mb-4 rounded-lg mx-auto">
						{isLogin ? "Login" : "Register"}
					</button>
				</form>
				<p className="text-center">
					{isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
					<button
						type="button"
						onClick={() => setIsLogin(!isLogin)}
						className="text-simon-blue bg-transparent border-none cursor-pointer">
						{isLogin ? "Register" : "Login"}
					</button>
				</p>
				<p className="text-center">
					<button
						type="button"
						onClick={() => navigate("/")}
						className="text-simon-blue bg-transparent border-none cursor-pointer">
						Go back to home
					</button>
				</p>
			</div>
		</Layout>
	);
}
