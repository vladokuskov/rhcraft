import { Post } from '@prisma/client'
import axios from 'axios'
import { NextApiResponse } from 'next'

const url = 'https://rhcraft.vercel.app/blog'

function generateSiteMap(posts: Post[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
        <loc>https://rhcraft.vercel.app/</loc>
     </url>
     <url>
         <loc>https://rhcraft.vercel.app/posts</loc>
     </url>
     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`${url}/${id}`}</loc>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  const response = await axios.get('/api/posts')

  const sitemap = generateSiteMap(response.data.data)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
