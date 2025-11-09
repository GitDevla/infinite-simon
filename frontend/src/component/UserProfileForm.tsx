import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {AuthContext} from "../context/AuthContext";
import {Backend} from "../util/Backend";
import FloatingInput from "./Atom/FloatingInput";

export default function UserProfileForm() {
	const userContext = useContext(AuthContext);
	const [form, setForm] = useState({
		username: "",
		email: "",
		profilePic: "",
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	useEffect(() => {
		setForm({
			username: userContext.user?.username || "",
			email: userContext.user?.email || "",
			profilePic: userContext.user?.avatar_uri || "",
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		});
	}, [userContext.user]);

	const onSendChanges = async (e: React.FormEvent) => {
		e.preventDefault();
		const updates: {
			username?: string;
			email?: string;
			profilePicture?: string;
			password?: string;
			currentPassword?: string;
		} = {};
		if (form.username && form.username !== userContext.user?.username) updates.username = form.username;
		if (form.email && form.email !== userContext.user?.email) updates.email = form.email;
		if (form.profilePic && form.profilePic !== userContext.user?.avatar_uri) {
			updates.profilePicture = form.profilePic;
		}
		if (form.newPassword) {
			if (form.newPassword !== form.confirmPassword) {
				toast.error("New password and confirmation do not match");
				return;
			}
			updates.currentPassword = form.currentPassword;
			updates.password = form.newPassword;
		}

		const res = await Backend.updateUserProfile(updates);
		if (res.ok) {
			toast.success("Profile updated successfully");
			userContext.updateUserProfile();
		} else {
			toast.error(`Failed to update profile: ${res.error}`);
		}
	};
	return (
		<section className="bg-bg-secondary bg-opacity-80 border border-gray-700 rounded-xl p-6">
			<h3 className="text-lg font-semibold mb-4">User Settings</h3>
			<form onSubmit={onSendChanges} className="space-y-4">
				<div className="flex items-center gap-4">
					<div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-600 flex-shrink-0">
						<img
							src={form.profilePic || "https://placehold.co/100?text=Avatar"}
							alt="profile"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="flex-1">
						<label htmlFor="stoppls" className="block text-xs text-fg-secondary mb-1">
							Profile picture (upload)
						</label>
						<input
							type="file"
							accept="image/*"
							className="block text-sm text-fg-secondary"
							onChange={ev => {
								const f = ev.target.files?.[0];
								if (!f) return;
								const reader = new FileReader();
								reader.onload = () => setForm(s => ({...s, profilePic: String(reader.result)}));
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
						className="bg-simon-blue text-fg-secondary px-4 py-2 rounded-lg shadow-sm hover:opacity-95">
						Save Changes
					</button>
				</div>
			</form>
		</section>
	);
}
