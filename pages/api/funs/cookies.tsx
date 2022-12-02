import { ImageResponse } from "@vercel/og";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

export function handle(str: string, cookies: RequestCookies) {
	return new ImageResponse(
		(
			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				cookies amirite
				<br />
				str: {str}
				<br />
				cookie: {cookies.get("tenckr_cookiestest")?.value}
			</div>
		),
		{
			width: 500,
			height: 500,
			headers: {
				"Set-Cookie": `tenckr_cookiestest=${str}`,
				"Cache-Control": "no-store",
			},
		}
	);
}

export const regex: RegExp = /^cookies.*/gm;
