import { Editor } from "@monaco-editor/react";
import { useState } from "react";

const CodeEditor = (props: {
	onChange: (action: string, data: string) => void;
	language: string | null;
	code: string;
}) => {
	const [value, setValue] = useState<string>(props.code || "");
	const handleEditorChange = (val: string | undefined) => {
		if (typeof val === "string") {
			setValue(val);
			props.onChange("code", val);
		} else {
			setValue("");
			props.onChange("code", "");
		}
	};

	return (
		<div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
			<Editor
				height="85vh"
				width={`100%`}
				language={props.language || "javascript"}
				value={props.code}
				defaultValue="// some comment"
				onChange={handleEditorChange}
			/>
		</div>
	);
};

export default CodeEditor;
