import { NextRequest } from "next/server";
import * as twentyfourtyeight from "./funs/2048";
import * as view from "./funs/view";
const funs = [twentyfourtyeight, view];

export const config = {
	runtime: "experimental-edge",
};

export default function (req: NextRequest) {
	const str = req.nextUrl.searchParams.get("str") ?? "";

	const fun = funs.find((fun) => fun.regex.test(str));
	if (!fun) return Response.redirect("https://patrick.miranda.org", 308);

	return fun.handle(str);
}
