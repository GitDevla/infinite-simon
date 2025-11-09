import NavCard from "../component/Atom/NavCard";
import Layout from "../component/Layout/Layout";
import {GameType} from "../service/Game";

function App() {
	return (
		<Layout header="Gamemodes">
			<nav className="grid grid-cols-1 gap-8 justify-center items-center mt-10 justify-items-center md:grid-cols-2">
				<NavCard
					lvlId={GameType.Simple}
					title="Classic Simon"
					description="Play the classic Simon game."
					imageUrl={`${process.env.PUBLIC_URL}/simon_default.png`}
				/>
				<NavCard
					lvlId={GameType.Extended}
					title="Extended Simon"
					description="Play the extended version of Simon with more features."
					imageUrl={`${process.env.PUBLIC_URL}/simon_infinite.png`}
				/>
			</nav>
		</Layout>
	);
}

export default App;
