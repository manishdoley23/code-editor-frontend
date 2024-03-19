import { classnames } from "../utils/utils";

const CustomInput = ({
	val,
	setVal,
}: {
	val: string | number;
	setVal: React.Dispatch<string>;
}) => {
	return (
		<>
			{" "}
			<textarea
				rows={5}
				value={val}
				onChange={(e) => setVal(e.target.value)}
				placeholder={`Custom input`}
				className={classnames(
					"focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2"
				)}
			></textarea>
		</>
	);
};

export default CustomInput;
