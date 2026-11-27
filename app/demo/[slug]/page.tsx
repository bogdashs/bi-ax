import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfileStage } from "@/components/profile-stage";
import { DEMOS, getDemo } from "@/lib/demos";
import { toBiaProfile } from "@/lib/profile";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return DEMOS.map((demo) => ({ slug: demo.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) return { title: "not found" };

  return { title: `${demo.name} — ${demo.role}`, description: demo.bio };
}

export default async function DemoPage({ params }: { params: Params }) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();

  return <ProfileStage profile={toBiaProfile(demo)} />;
}
