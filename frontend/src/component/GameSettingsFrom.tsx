import {Themes, useTheme} from "../context/ThemeContextProvider";

export default function GameSettingsForm() {
	const theme = useTheme();
	return (
		<section className="bg-bg-secondary bg-opacity-80 border border-gray-700 rounded-xl p-6">
			<h3 className="text-lg font-semibold mb-2">Game Settings</h3>
			{/* toggle theme */}
			<div className="flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<span className="font-medium">Theme</span>
					<select
						value={theme.theme ?? "dark"}
						onChange={e => theme.updateTheme(e.target.value as keyof typeof Themes)}
						className="p-2.5 bg-bg-secondary border border-gray-600 rounded-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer">
						{Object.entries(Themes).map(([key, value]) => (
							<option key={value} value={value}>
								{key
									.replace("_", " ")
									.toLowerCase()
									.replace(/\b\w/g, c => c.toUpperCase())}
							</option>
						))}
					</select>
				</div>
			</div>
		</section>
	);
}
