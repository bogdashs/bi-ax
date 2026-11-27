import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BioPage } from "@/components/bio-page";
import { DEMOS, getDemo } from "@/lib/demos";

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
  if (!demo) return { title: "Страница не найдена" };

  return {
    title: `${demo.name} — ${demo.role}`,
    description: demo.bio,
    alternates: { canonical: `/demo/${demo.slug}` },
  };
}

export default async function DemoPage({ params }: { params: Params }) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();

  return <BioPage demo={demo} />;
}
