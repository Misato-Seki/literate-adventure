import Link from 'next/link'
import React from 'react'

type News = {
  id: string
  title: string
  text: string
  thumbnail: {
    url: string
    alt: string
  }
  slug: string
}

export default async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news?where[status][equals]=published`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    console.error('Failed to fetch news:', res.statusText)
    return <div>Error loading news</div>
  }

  const data = await res.json()
  const news: News[] = data?.docs ?? [] // ✅ data.docsがundefinedの場合、空配列を代入
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.length > 0 ? (
          news.map((item) => (
            <Link key={item.id} href={`/news/${item.slug}`}>
              <h1>{item.title}</h1>
            </Link>
          ))
        ) : (
          <p>No news available</p> // ✅ ニュースが空の場合の表示
        )}
      </div>
      <Link href="/"><h1>Home</h1></Link>
    </div>
  )
}
