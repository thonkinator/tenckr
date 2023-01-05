import { ImageResponse } from "@vercel/og";
import { Board, Directions } from "./Board";

const fontNormalFetch = fetch(new URL("./clear-sans/ClearSans-Regular.ttf", import.meta.url)).then(
	(res) => res.arrayBuffer()
);
const fontBoldFetch = fetch(new URL("./clear-sans/ClearSans-Bold.ttf", import.meta.url)).then(
	(res) => res.arrayBuffer()
);

const SCALE = 1.25;

function Score(props: { label: string; score: number }) {
	return (
		<div
			style={{
				backgroundColor: "#bbada0",
				color: "white",
				height: "54px",
				fontSize: "28px",
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
					fontSize: "15px",
					margin: "0 -25px",
					paddingBottom: "2px",
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

function Bold({ children, left = true }: { children?: React.ReactNode; left?: boolean }) {
	return <b style={left ? { padding: "0 0.275em" } : { paddingRight: "0.275em" }}>{children}</b>;
}

export async function handle(str: string) {
	console.log(str);
	const args = str.slice(7).split("&");
	const tiles = JSON.parse(decodeURIComponent(args[0])) as number[][];
	const score = Number(args[1]);

	const fontNormal = await fontNormalFetch;
	const fontBold = await fontBoldFetch;

	return new ImageResponse(
		(
			<div
				style={{
					width: `${Math.floor(100 / SCALE)}%`,
					height: `${Math.floor(100 / SCALE)}%`,
					transform: `scale(${SCALE})`,
					margin: "auto",
					display: "flex",
					flexDirection: "row",
					backgroundColor: "#faf8ef",
					color: "#776e65",
					fontFamily: "Clear Sans",
					fontSize: "28px",
					padding: "0 18px",
					borderRadius: "12px",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
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
							<Score label="SCORE" score={score}></Score>
							{/* <Score label="BEST" score={0}></Score> */}
						</div>
					</header>
					<main
						style={{
							width: "500px",
							height: "500px",
							backgroundColor: "#bbada0",
							borderRadius: "6px",
							margin: "18px 0",
							display: "flex",
							flexWrap: "wrap",
							padding: "7.5px",
						}}
					>
						{[
							...tiles
								.map((col, i) => tiles.map((row) => row[i])) // https://stackoverflow.com/a/46805290
								.flat(),
						].map((v, i) => (
							<Tile number={v} key={i}></Tile>
						))}
					</main>
				</div>
				<aside
					style={{
						display: "flex",
						flexDirection: "column",
						paddingTop: "18px",
						paddingLeft: "18px",
					}}
				>
					<div
						style={{
							display: "flex",
						}}
					>
						Join the numbers and
					</div>
					<div style={{ display: "flex", marginBottom: "20px" }}>
						get to the <Bold>2048 tile!</Bold>
					</div>
					<Bold left={false}>Controls:</Bold>
					<ul
						style={{
							display: "flex",
							flexDirection: "column",
							marginTop: "0.3em",
							marginLeft: "0.3em",
						}}
					>
						<li>
							Up:<Bold>s/8/8u</Bold>
						</li>
						<li>
							Down:<Bold>s/8/8d</Bold>
						</li>
						<li>
							Left:<Bold>s/8/8l</Bold>
						</li>
						<li>
							Right:<Bold>s/8/8r</Bold>
						</li>
					</ul>
				</aside>
			</div>
		),
		{
			width: Math.ceil(825 * SCALE),
			height: Math.ceil(630 * SCALE),
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

export const regex = /^img2048.*/gm;
