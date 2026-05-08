import { Homepage } from "@/components/marketing/homepage";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Homepage />
      </main>
      <SiteFooter />
    </>
  );
}
