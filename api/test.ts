import { ImageResponse } from '@vercel/og';

export const config = {
	runtime: 'experimental-edge',
};

export default function () {
	return new ImageResponse({
		type: "div",
		props: {
			children: "Hello, World",
			style: {
				backgroundColor: "black",
				color: "white"
			}
		}
	}, { width: 500, height: 500 });
}
