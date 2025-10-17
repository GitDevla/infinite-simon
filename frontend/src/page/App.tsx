import Layout from "../component/Layout";
import NavCard from "../component/NavCard";
import {GameType} from "../service/Game";

function App() {
	return (
		<Layout header="Gamemodes">
			<nav className="grid grid-cols-1 gap-8 justify-center items-center mt-10 justify-items-center md:grid-cols-2">
				<NavCard
					lvlId={GameType.Simple}
					title="Classic Simon"
					description="Play the classic Simon game."
					imageUrl="https://placehold.co/600x400"
				/>
				<NavCard
					lvlId={GameType.Extended}
					title="Extended Simon"
					description="Play the extended version of Simon with more features."
					imageUrl="https://placehold.co/600x400"
				/>
			</nav>
		</Layout>
	);
}

export default App;
