import { NextRequest } from "next/server";
import funs from "./funs";

export const config = {
	runtime: "experimental-edge",
};

export default function (req: NextRequest) {
	const str = req.nextUrl.searchParams.get("str") ?? "";

	const fun = funs.find((fun) => fun.regex.test(str));
	if (!fun) return Response.redirect("https://patrick.miranda.org", 308);

	return fun.handle(str);
}
