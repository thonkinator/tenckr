import { ImageResponse } from "@vercel/og";
import { Board, Directions } from "./Board";

const fontNormalFetch = fetch(new URL("./clear-sans/ClearSans-Regular.ttf", import.meta.url)).then(
	(res) => res.arrayBuffer()
);
const fontBoldFetch = fetch(new URL("./clear-sans/ClearSans-Bold.ttf", import.meta.url)).then(
	(res) => res.arrayBuffer()
);

function Score(props: { label: string; score: number }) {
	return (
		<div
			style={{
				backgroundColor: "#bbada0",
				color: "white",
				height: "54px",
				fontSize: "25px",
				borderRadius: "3px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				lineHeight: "22px",
				padding: "0 25px",
				marginLeft: "4px",
			}}
		>
			<span
				style={{
					color: "#eee4da",
					fontSize: "13px",
					margin: "0 -25px",
				}}
			>
				{props.label}
			</span>
			{props.score}
		</div>
	);
}

function tileStyles(number: number) {
	switch (number) {
		case 2:
			return {
				color: "#776e65",
				backgroundColor: "#eee4da",
			};
		case 4:
			return {
				color: "#776e65",
				backgroundColor: "#eee1c9",
			};
		case 8:
			return {
				backgroundColor: "#f3b27a",
			};
		case 16:
			return {
				backgroundColor: "#f69664",
			};
		case 32:
			return {
				backgroundColor: "#f77c5f",
			};
		case 64:
			return {
				backgroundColor: "#f75f3b",
			};
		case 128:
			return {
				backgroundColor: "#edd073",
				boxShadow:
					"0 0 30px 10px rgba(243, 215, 116, 0.238095), inset 0 0 0 1px rgba(255, 255, 255, 0.142857)",
				fontSize: "45px",
			};
		case 256:
			return {
				backgroundColor: "#edcc62",
				boxShadow:
					"0 0 30px 10px rgba(243, 215, 116, 0.31746), inset 0 0 0 1px rgba(255, 255, 255, 0.190476)",
				fontSize: "45px",
			};
		case 512:
			return {
				backgroundColor: "#edc950",
				boxShadow:
					"0 0 30px 10px rgba(243, 215, 116, 0.396825), inset 0 0 0 1px rgba(255, 255, 255, 0.238095)",
				fontSize: "45px",
			};
		case 1024:
			return {
				backgroundColor: "#edc53f",
				boxShadow:
					"0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.285714)",
				fontSize: "35px",
			};
		case 2048:
			return {
				backgroundColor: "#edc22e",
				boxShadow:
					"0 0 30px 10px rgba(243, 215, 116, 0.555556), inset 0 0 0 1px rgba(255, 255, 255, 0.333333)",
				fontSize: "35px",
			};
	}
	if (number > 2048) {
		return {
			backgroundColor: "#3c3a33",
			fontSize: "30px",
		};
	}
}

function Tile(props: { number: number }) {
	return (
		<div
			style={Object.assign(
				{
					backgroundColor: "rgba(238, 228, 218, 0.35)",
					width: "106.25px",
					height: "106.25px",
					margin: "7.5px",
					borderRadius: "4px",
					display: "flex",
					fontSize: "55px",
					fontWeight: "bold",
					alignItems: "center",
					justifyContent: "center",
					color: "#f9f6f2",
				},
				tileStyles(props.number)
			)}
		>
			{props.number == 0 ? "" : props.number}
		</div>
	);
}

export async function handle(str: string) {
	const board = new Board(4, 4, str.match(/^2048[udlr]*(.*)$/m)![1] + "seed");
	str
		.toLowerCase()
		.match(/^2048([udlr]*).*/m)![1]
		.split("")
		.map(
			(move) =>
				({ u: Directions.UP, d: Directions.DOWN, l: Directions.LEFT, r: Directions.RIGHT }[move])
		)
		.forEach((move) => board.move(move!));

	const fontNormal = await fontNormalFetch;
	const fontBold = await fontBoldFetch;

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					backgroundColor: "#faf8ef",
					color: "#776e65",
					fontFamily: "Clear Sans",
					fontSize: "18px",
					padding: "0 18px",
					borderRadius: "12px",
				}}
			>
				<header
					style={{
						fontSize: "68px",
						fontWeight: "bold",
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						width: "100%",
					}}
				>
					<h1
						style={{
							margin: "0",
						}}
					>
						2048
					</h1>
					<div
						style={{
							display: "flex",
							marginLeft: "auto",
						}}
					>
						<Score label="SCORE" score={board.score}></Score>
						{/* <Score label="BEST" score={0}></Score> */}
					</div>
				</header>
				<section>
					Join the numbers and get to the
					<b style={{ paddingLeft: "0.275em" }}>2048 tile!</b>
				</section>
				<main
					style={{
						width: "100%",
						height: "500px",
						backgroundColor: "#bbada0",
						borderRadius: "6px",
						marginTop: "20px",
						display: "flex",
						flexWrap: "wrap",
						padding: "7.5px",
					}}
				>
					{[
						...board.tiles
							.map((col, i) => board.tiles.map((row) => row[i])) // https://stackoverflow.com/a/46805290
							.flat(),
					].map((v, i) => (
						<Tile number={v} key={i}></Tile>
					))}
				</main>
			</div>
		),
		{
			width: 536,
			height: 800,
			// debug: true,
			fonts: [
				{
					name: "Clear Sans",
					data: fontNormal,
					style: "normal",
					weight: 400,
				},
				{
					name: "Clear Sans",
					data: fontBold,
					style: "normal",
					weight: 700,
				},
			],
			headers: {
				"Cache-Control": "no-store",
			},
		}
	);
}

export const regex: RegExp = /^2048.*/gm;
