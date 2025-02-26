import { News } from "@/payload-types";
import Image from "next/image";
import { RichTextRender } from "../../components/RichTextRender";
import { DateFormat } from "../../components/DateFormat";


export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news?where[slug][equals]=${slug}`)

    if (!res.ok) {
        console.error('Failed to fetch news:', res.statusText)
        return <div>Error loading news</div>
    }

    const data = await res.json()
    const news: News = data.docs[0]

    return (
        <div>
            <h1>{news.title}</h1>
            {news.publishedDate && <DateFormat date={news.publishedDate} />}
            {news.tag && news.tag.map((tag: string) => <p key={tag}>{tag}</p>)}
            {/* thumbnailがMedia型の場合にのみURLを表示 */}
            {typeof news.thumbnail !== "string" && news.thumbnail?.url && (
                <Image src={news.thumbnail.url} alt={news.thumbnail.alt || "Thumbnail"} width={500} height={300} />
            )}
            <RichTextRender data={news.text} />
        </div>
    )
  }