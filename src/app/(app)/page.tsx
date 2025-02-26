import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-600 text-white">
      This is Home page.
      <Link href="/news"><h1>NEWS</h1></Link>
    </div>
  );
}
