import { useEffect, useState } from "react";
import { Form } from "../utils/type";

import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Result = () => {
	const [loader, setLoader] = useState(true);
	const [data, setData] = useState<Form[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		setLoader(true);
		(async () => {
			const response = await (
				await fetch(`${import.meta.env.VITE_DEV_BACKEND}/data`, {
					method: "GET",
					headers: {
						"Content-type": "application/json",
					},
				})
			).json();

			setData(response);
			setLoader(false);
		})();
	}, []);

	const truncateCode = (code: string) => {
		return code.length > 100 ? code.substring(0, 100) + "..." : code;
	};

	return (
		<div className="min-h-screen w-screen pt-[50px] flex items-center">
			{loader ? (
				<div className="m-auto">
					<ColorRing
						visible={true}
						height="100"
						width="100"
						ariaLabel="color-ring-loading"
						wrapperStyle={{}}
						wrapperClass="color-ring-wrapper"
						colors={[
							"#e15b64",
							"#f47e60",
							"#f8b26a",
							"#abbd81",
							"#849b87",
						]}
					/>
				</div>
			) : (
				<div className="m-auto">
					<div className="relative">
						<button
							className="text-2xl -top-5 left-0 absolute transition-all duration-200 hover:text-gray-400"
							onClick={() => navigate("/code-submit")}
						>
							Submit again
						</button>
						<table className="pt-10 border-separate border-spacing-8">
							<thead>
								<tr>
									<th>Username</th>
									<th>Code Lang</th>
									<th>Standard Input</th>
									<th>Code</th>
									<th>Submissions</th>
									<th>Time Stamp</th>
								</tr>
							</thead>
							<tbody>
								{data.map((val, idx) => {
									return (
										<tr
											key={idx}
											className="border border-black"
										>
											<td>{val.username}</td>
											<td>{val.prefLang}</td>
											<td className="max-w-[50px]">
												{val.stdInt}
											</td>
											<td className="max-w-[100px]">
												{truncateCode(val.code)}
											</td>
											<td>{val.submissions}</td>
											<td>{val.timestamp}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
};

export default Result;
