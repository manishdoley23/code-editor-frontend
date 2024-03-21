import { useState } from "react";
import { SubmitForm } from "../utils/type";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const CodeSubmit = () => {
	const navigate = useNavigate();
	const [formVal, setFormVal] = useState<SubmitForm>({
		username: "",
		code: "",
		prefLang: {
			id: 54,
			lang: "C++",
		},
		stdInt: "",
		submissions: "",
	});
	const [processing, setProcessing] = useState(false);

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setProcessing(true);

		const formData = {
			language_id: formVal.prefLang.id,
			source_code: btoa(formVal.code),
			stdin: btoa(formVal.stdInt),
		};

		try {
			const url = `${
				import.meta.env.VITE_RAPID_API_URL
			}?base64_encoded=true&fields=*`;

			const options = {
				method: "POST",
				headers: {
					"content-type": "application/json",
					"Content-Type": "application/json",
					"X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_X_KEY,
					"X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_X_HOST,
				},
				body: JSON.stringify(formData),
			};

			try {
				const response = await fetch(url, options);
				const result = await response.text();
				const token = JSON.parse(result);
				checkStatus(token.token);
			} catch (error) {
				setProcessing(false);
				console.error(error);
			}
		} catch (error) {
			toast("Error in code submission");
			setProcessing(false);
			throw new Error("Error");
		}
	};

	const checkStatus = async (token: string) => {
		const url = `${
			import.meta.env.VITE_RAPID_API_URL
		}/${token}?base64_encoded=true&fields=*`;
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_X_KEY,
				"X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_X_HOST,
			},
		};

		try {
			const response = await fetch(url, options);
			const result = JSON.parse(await response.text());
			const statusId = result.status_id;

			if (statusId === 3) {
				setFormVal((prev) => ({
					...prev,
					submissions: atob(result.stdout),
				}));
				saveToDb(atob(result.stdout));
			} else if (statusId === 1 || statusId === 2) {
				setTimeout(() => {
					checkStatus(token);
				}, 2000);
				return;
			} else {
				toast("Error in code submission");
				setProcessing(false);
				return;
			}
		} catch (error) {
			setProcessing(false);
			console.error(error);
		}
	};

	const saveToDb = async (submission: string) => {
		const objToSend = {
			code: formVal.code,
			stdInt: formVal.stdInt,
			submissions: submission,
			username: formVal.username,
			prefLang: formVal.prefLang.lang,
		};

		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND}/submitCode`,
				{
					method: "POST",
					headers: {
						"Content-type": "Application/json",
					},
					body: JSON.stringify(objToSend),
				}
			);

			console.log("response:", response.status);

			if (response.status === 200) {
				setProcessing(false);
				navigate(`/result`);
			} else {
				toast("Error in code submission");
				setProcessing(false);
			}
		} catch (error) {
			setProcessing(false);
			toast("Error while saving to db");
		}
	};

	return (
		<div className="flex justify-center items-center w-full h-screen">
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				transition={Bounce}
			/>
			<form
				className="border border-black rounded-2xl py-10 px-10 flex flex-col justify-start w-[500px]"
				onSubmit={submitHandler}
			>
				<div className="flex flex-col gap-2">
					<label>Username</label>
					<input
						value={formVal.username}
						onChange={(e) => {
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
						value={formVal.prefLang.lang}
						onChange={(e) => {
							let langValue = e.target.value;
							let langId: number;
							switch (langValue) {
								case "C++":
									langId = 54;
									break;
								case "Java":
									langId = 91;
									break;
								case "JavaScript":
									langId = 93;
									break;
								case "Python":
									langId = 71;
									break;
								default:
									langId = 54;
									langValue = "C++";
									break;
							}

							setFormVal((prev) => ({
								...prev,
								prefLang: {
									id: langId,
									lang: langValue,
								},
							}));
						}}
					>
						<option value="C++">C++</option>
						<option value="Java">Java</option>
						<option value="JavaScript">Javascript</option>
						<option value="Python">Python</option>
					</select>
				</div>

				<div className="mt-3 flex flex-col gap-2">
					<label>Custom input</label>
					<textarea
						rows={2}
						className="border border-black outline-none px-2 py-1"
						value={formVal.stdInt}
						onChange={(e) =>
							setFormVal((prev) => ({
								...prev,
								stdInt: e.target.value,
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
					className={`mt-3 border border-black font-bold w-full px-2 py-2 hover:bg-black hover:text-white ${
						processing && "bg-black text-white pointer-events-none"
					}`}
					type="submit"
				>
					{processing ? "PROCESSING..." : "SUBMIT"}
				</button>
			</form>
		</div>
	);
};

export default CodeSubmit;
