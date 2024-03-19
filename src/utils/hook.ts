import React, { useState } from "react";

export const useKeyPress = (targetKey: string) => {
	const [keyPressed, setKeyPressed] = useState(false);

	function downHandler({ key }: { key: string }) {
		if (key === targetKey) {
			setKeyPressed(true);
		}
	}

	const upHandler = ({ key }: { key: string }) => {
		if (key === targetKey) {
			setKeyPressed(false);
		}
	};

	React.useEffect(() => {
		document.addEventListener("keydown", downHandler);
		document.addEventListener("keyup", upHandler);

		return () => {
			document.removeEventListener("keydown", downHandler);
			document.removeEventListener("keyup", upHandler);
		};
	});

	return keyPressed;
};
