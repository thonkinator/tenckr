import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
	runtime: "experimental-edge",
};

export default function (req: NextRequest) {
	if (!req.nextUrl.searchParams.get("str")?.startsWith("view"))
		return Response.redirect("https://patrick.miranda.org", 308);

	const str = req.nextUrl.searchParams.get("str")?.slice(4);

	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 48,
					color: "white",
					width: "100%",
					height: "100%",
					display: "flex",
					textAlign: "center",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{str}
			</div>
		),
		{
			width: 500,
			height: 500,
		}
	);
}
