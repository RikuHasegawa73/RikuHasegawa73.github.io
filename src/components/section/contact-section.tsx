import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

/** 連絡先。見出しは他のセクションとそろえて、小さめの左寄せにする */
export default function ContactSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-6">
      <h2 className="text-xl font-bold">連絡先</h2>
      <div className="relative overflow-hidden rounded-xl border p-6 sm:p-8">
        <div className="absolute inset-x-0 top-0 h-2/3">
          <FlickeringGrid
            className="h-full w-full"
            squareSize={2}
            gridGap={2}
            style={{
              maskImage: "linear-gradient(to bottom, black, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          />
        </div>
        <div className="relative flex flex-col gap-3">
          <p className="text-lg font-semibold">ご相談はメールで</p>
          <p className="max-w-lg text-muted-foreground text-pretty">
            小さな改修からでもご相談ください。内容を伺ったうえで、機能の一覧にもとづいてお見積りをお出しします。
          </p>
          <Link
            href={DATA.contact.social.email.url}
            className="w-fit rounded-sm text-blue-500 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {DATA.contact.email}
          </Link>
        </div>
      </div>
    </div>
  );
}
