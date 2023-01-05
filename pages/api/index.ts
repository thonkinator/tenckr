import { NextRequest } from "next/server";
import * as twentyfourtyeight from "./funs/2048";
import * as twentyfourtyeightimg from "./funs/2048img";
import * as view from "./funs/view";
const funs = [twentyfourtyeightimg, twentyfourtyeight, view];

export const config = {
	runtime: "experimental-edge",
};

export default function (req: NextRequest) {
	const str = req.nextUrl.searchParams.get("str") ?? "";

	const fun = funs.find((fun) => fun.regex.test(str));
	console.log(fun?.regex.toString());
	if (!fun) return Response.redirect("https://patrick.miranda.org", 308);

	return fun.handle(str);
}
