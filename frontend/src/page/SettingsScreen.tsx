import {use, useContext, useEffect, useState} from "react";
import FloatingInput from "../component/FloatingInput";
import Layout from "../component/Layout";
import {AuthContext} from "../context/AuthContext";

export default function SettingsScreen() {
	const userContext = useContext(AuthContext);
	const loggedIn = userContext.loggedIn;
	const [form, setForm] = useState({
		username: "",
		email: "",
		profilePic: "",
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		// Mock: TODO
		if (loggedIn) {
			setForm({
				username: userContext.username || "",
				email: "asd@asd.asd",
				profilePic: userContext.useravatar || "",
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			});
		}
	}, [loggedIn, userContext.username, userContext.useravatar]);

	return (
		<Layout header="Settings">
			<div className="max-w-[700px] mx-auto space-y-6">
				{loggedIn && (
					<section className="bg-bg-secondary bg-opacity-80 border border-gray-700 rounded-xl p-6">
						<h3 className="text-lg font-semibold mb-4">User Settings</h3>
						<form
							onSubmit={e => {
								e.preventDefault();
								alert("This is a mock. In a real app, changes would be saved.");
								setMessage("Changes saved (mock).");
							}}
							className="space-y-4">
							<div className="flex items-center gap-4">
								<div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-600 flex-shrink-0">
									<img src={form.profilePic} alt="profile" className="w-full h-full object-cover" />
								</div>
								<div className="flex-1">
									{/* TODO */}
									<label htmlFor="stoppls" className="block text-xs text-gray-400 mb-1">
										Profile picture (upload)
									</label>
									<input
										type="file"
										accept="image/*"
										className="block text-sm text-gray-200"
										onChange={ev => {
											const f = ev.target.files?.[0];
											if (!f) return;
											const reader = new FileReader();
											reader.onload = () =>
												setForm(s => ({...s, profilePic: String(reader.result)}));
											reader.readAsDataURL(f);
										}}
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<FloatingInput
										label="Username"
										state={form.username}
										setState={v => {
											setForm(s => ({...s, username: v}));
										}}
										type="text"
									/>
								</div>
								<div>
									<FloatingInput
										label="Email"
										state={form.email}
										setState={v => {
											setForm(s => ({...s, email: v}));
										}}
										type="email"
									/>
								</div>
							</div>

							<hr className="border-gray-700 my-2" />

							<h4 className="text-sm font-medium">Change password</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FloatingInput
									label="Current password"
									state={form.currentPassword}
									setState={v => {
										setForm(s => ({...s, currentPassword: v}));
									}}
									type="password"
								/>
								<FloatingInput
									label="New password"
									state={form.newPassword}
									setState={v => {
										setForm(s => ({...s, newPassword: v}));
									}}
									type="password"
								/>
								<div className="md:col-span-2">
									<FloatingInput
										label="Confirm new password"
										state={form.confirmPassword}
										setState={v => {
											setForm(s => ({...s, confirmPassword: v}));
										}}
										type="password"
									/>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<button
									type="submit"
									className="bg-simon-blue text-white px-4 py-2 rounded-lg shadow-sm hover:opacity-95">
									Save Changes
								</button>
								{message && <p className="text-sm text-emerald-400 ml-2">{message}</p>}
							</div>
						</form>
					</section>
				)}

				<section className="bg-bg-secondary bg-opacity-80 border border-gray-700 rounded-xl p-6">
					<h3 className="text-lg font-semibold mb-2">Game Settings</h3>
					<p>Soon</p>
				</section>
			</div>
		</Layout>
	);
}
