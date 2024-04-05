import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom";

export async function POST(req: NextRequest, res: NextResponse) {
  const { input } = await req.json();

  console.log("input is:", input);

  const response = await fetch(
    `https://www.npmjs.com/package/${input.toLowerCase()}`,
    {
      method: "GET",
    }
  );
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;
  const downloads = document.querySelector("._9ba9a726")?.textContent;

  console.log("downloads:", downloads);

  return NextResponse.json({ downloads });
}
