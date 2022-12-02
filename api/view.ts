import { ImageResponse } from '@vercel/og';

export const config = {
	runtime: 'experimental-edge',
};

export default function () {
	return new ImageResponse({
		type: "div",
		props: {
			children: "hello toby",
			style: {
				backgroundColor: "black",
				color: "white",
				width: "100%",
				height: "100%",
				fontSize: "72px",
			}
		}
	}, { width: 500, height: 500 });
}
