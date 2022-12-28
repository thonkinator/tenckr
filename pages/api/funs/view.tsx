import { ImageResponse } from "@vercel/og";

export function handle() {
	return new ImageResponse(
		(
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					height: "100%",
					color: "white",
					fontSize: "48px",
				}}
			>
				To play 2048, send: <br /> s/view/2048
				<br style={{ margin: "20px 0" }} />
				there's nothing else here right now
			</div>
		),
		{
			width: 450,
			height: 300,
		}
	);
}

export const regex = /^view.*/gm;
