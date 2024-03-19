import { useState } from "react";
const App = () => {
	const [formVal, setFormVal] = useState<{
		username: string;
		prefLang: string;
		stdInput: string;
		code: string;
	}>({
		username: "",
		code: "",
		prefLang: "C++",
		stdInput: "",
	});

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log("formval:", formVal);
		try {
			const response = await fetch("http://localhost:9999/submitCode", {
				method: "POST",
				headers: {
					"Content-type": "Application/json",
				},
				body: JSON.stringify(formVal),
			});

			const data = await response.json();
			console.log("data:", data);
		} catch (error) {
			throw new Error("Error");
		}
	};

	return (
		<div className="flex justify-center items-center w-full h-screen">
			<form
				className="border border-black rounded-2xl py-10 px-10 flex flex-col justify-start w-[500px]"
				onSubmit={submitHandler}
			>
				<div className="flex flex-col gap-2">
					<label>Username</label>
					<input
						value={formVal.username}
						onChange={(e) => {
							console.log("e:", e.target.value);

							// formVal.username
							setFormVal((prev) => ({
								...prev,
								username: e.target.value,
							}));
						}}
						className="border border-black outline-none px-2 py-1"
					/>
				</div>

				<div className="mt-3 flex flex-col gap-2">
					<label>Preferred coding language</label>
					<select
						className="w-[80px] px-2 py-1 border border-black"
						value={formVal.prefLang}
						onChange={(e) =>
							setFormVal((prev) => ({
								...prev,
								prefLang: e.target.value,
							}))
						}
					>
						<option value="C++">C++</option>
						<option value="Java">Java</option>
						<option value="Javascript">Javascript</option>
						<option value="Python">Python</option>
					</select>
				</div>

				<div className="mt-3 flex flex-col gap-2">
					<label>Custom input</label>
					<textarea
						rows={2}
						className="border border-black outline-none px-2 py-1"
						value={formVal.stdInput}
						onChange={(e) =>
							setFormVal((prev) => ({
								...prev,
								stdInput: e.target.value,
							}))
						}
					/>
				</div>

				<div className="mt-3 flex flex-col gap-2">
					<label>Source code</label>
					<textarea
						rows={5}
						className="border border-black outline-none px-2 py-1"
						value={formVal.code}
						onChange={(e) =>
							setFormVal((prev) => ({
								...prev,
								code: e.target.value,
							}))
						}
					/>
				</div>
				<button
					className="mt-3 border border-black font-bold w-full px-2 py-2 hover:bg-black hover:text-white"
					type="submit"
				>
					SUBMIT
				</button>
			</form>
		</div>
	);
};

export default App;
