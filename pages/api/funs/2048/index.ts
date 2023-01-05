import { Board, Directions } from "./Board";

export async function handle(str: string) {
	const board = new Board(4, 4, str.match(/^2048[udlr]*(.*)$/m)![1] + "seed");
	str
		.toLowerCase()
		.match(/^2048([udlr]*).*/m)![1]
		.split("")
		.reverse()
		.map(
			(move) =>
				({ u: Directions.UP, d: Directions.DOWN, l: Directions.LEFT, r: Directions.RIGHT }[move])
		)
		.forEach((move) => board.move(move!));

	return new Response(
		`
		<!DOCTYPE html>
		<html>
			<head>
				<meta property="og:title" content="2048" />
				<meta property="og:image" content="${
					process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://tenckr.com"
				}/2048img${encodeURIComponent(JSON.stringify(board.tiles))}&${board.score}" />
				<meta property="og:title" content="2048" />
			</head>
		</html>
	`,
		{
			headers: {
				"Content-Type": "text/html",
			},
		}
	);
}

export const regex = /^2048.*/gm;
