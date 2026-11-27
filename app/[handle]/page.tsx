import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PublicProfile } from "@/components/public-profile";
import { RESERVED_USERNAMES } from "@/lib/username";

type Params = Promise<{ handle: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { handle } = await params;
  return { title: `@${handle}` };
}

export default async function HandlePage({ params }: { params: Params }) {
  const { handle } = await params;
  const clean = decodeURIComponent(handle).toLowerCase();

  if (!/^[a-z0-9-]{3,20}$/.test(clean) || RESERVED_USERNAMES.has(clean)) {
    notFound();
  }

  return <PublicProfile handle={clean} />;
}
