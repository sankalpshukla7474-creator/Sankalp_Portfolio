import { NextResponse } from "next/server";

import {
  buildContactComposeUrl,
  sendContactEmail,
} from "@/services/contactEmail";

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function buildContactRedirect(request: Request, status: "sent" | "error") {
  const url = new URL("/", request.url);
  url.searchParams.set("contact", status);
  url.hash = "contact";
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = getStringValue(formData, "name");
  const email = getStringValue(formData, "email");
  const message = getStringValue(formData, "message");

  if (!name || !email || !message) {
    return buildContactRedirect(request, "error");
  }

  try {
    await sendContactEmail({ name, email, message });
    return buildContactRedirect(request, "sent");
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(
      buildContactComposeUrl({ name, email, message }),
      303,
    );
  }
}
