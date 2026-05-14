import { db } from "@/db"
import { headers } from "next/headers"
import { Webhook } from "svix"
import { WebhookEvent } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env")
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error occurred", {
      status: 400,
    })
  }

  const eventType = evt.type

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, primary_email_address_id } = evt.data

    const primaryEmail = email_addresses.find(
      (email) => email.id === primary_email_address_id
    )

    if (!primaryEmail) {
      return new Response("No primary email found", { status: 400 })
    }

    await db.user.upsert({
      where: { externalId: id },
      update: {
        email: primaryEmail.email_address,
      },
      create: {
        externalId: id,
        email: primaryEmail.email_address,
        quotaLimit: 100, // Default quota limit for free users
      },
    })
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data

    if (id) {
      await db.user.delete({
        where: { externalId: id },
      }).catch(() => {
      })
    }
  }

  return new Response("OK", { status: 200 })
}
