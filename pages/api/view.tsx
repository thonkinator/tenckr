import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
	runtime: "experimental-edge",
};

export default function (req: NextRequest) {
	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 64,
					color: "white",
					width: "100%",
					height: "100%",
					display: "flex",
					textAlign: "center",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{req.nextUrl.searchParams.get("str")?.slice(4)}
			</div>
		),
		{
			width: 500,
			height: 500,
		}
	);
}
