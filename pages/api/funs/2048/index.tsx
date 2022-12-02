import { ImageResponse } from "@vercel/og";

export function handle(str: string) {
	const stockfish = new Worker("stockfish.wasm.js");

	return new ImageResponse(
		(
			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				chess amirite
				<br />
				{str}
			</div>
		),
		{ width: 500, height: 500 }
	);
}

export const regex: RegExp = /^2048.*/gm;
