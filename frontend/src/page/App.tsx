import Header from "../component/Header";
import Logo from "../component/Logo";
import NavCard from "../component/NavCard";

function App() {
	return (
		<div>
			<Header />
			<div className="mt-32 w-screen">
				<Logo size="large" />
				<h2 className="text-2xl font-semibold text-center mb-6 mt-2">Gamemodes</h2>
				<nav className="grid grid-cols-1 gap-8 justify-center items-center mt-10 justify-items-center md:grid-cols-2">
					<NavCard
						lvlId="classic"
						title="Classic Simon"
						description="Play the classic Simon game."
						imageUrl="https://placehold.co/600x400"
					/>
					<NavCard
						lvlId="extended"
						title="Extended Simon"
						description="Play the extended version of Simon with more features."
						imageUrl="https://placehold.co/600x400"
					/>
				</nav>
			</div>
		</div>
	);
}

export default App;
