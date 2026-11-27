import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Editor } from "@/components/editor";

export const metadata = { title: "editor" };

export default async function DashboardPage() {
  const store = await cookies();
  if (store.get("biax_demo")?.value !== "1") {
    redirect("/login");
  }

  return <Editor />;
}
