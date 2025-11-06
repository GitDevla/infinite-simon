import Logo from "../Atom/Logo";
import Header from "./Header";

export default function Layout({
	children,
	header,
	hideNavbar = false,
}: {
	children: React.ReactNode;
	header: string;
	hideNavbar?: boolean;
}) {
	return (
		<div className="mt-16">
			{!hideNavbar && <Header />}
			<div className="flex justify-center">
				<Logo size="large" />
			</div>
			<h2 className="text-2xl font-semibold text-center mb-6 mt-2">{header}</h2>
			<div className="layout-container">{children}</div>
		</div>
	);
}
