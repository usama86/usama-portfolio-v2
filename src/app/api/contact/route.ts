import { handleContact } from "@/lib/contact-service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleContact(request);
}
