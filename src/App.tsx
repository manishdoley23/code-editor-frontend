import { Link } from "react-router-dom";

const App = () => {
	return (
		<div className="h-screen w-screen flex items-center justify-center">
			<Link
				className="text-3xl transition-all duration-200 hover:text-gray-400"
				to={"/code-submit"}
			>
				Submit your code
			</Link>
		</div>
	);
};

export default App;
