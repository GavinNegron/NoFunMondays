const URL = "https://nofunmondays.com";

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${`${URL}/`}</loc>
    </url>
     ${posts
       .map(({ slug, createdAt }) => {
         return `
           <url>
               <loc>${`${URL}/blog/${slug}`}</loc>
               <lastmod>${new Date(createdAt).toISOString()}</lastmod>
           </url>
         `;
       })
       .join("")}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  const response = await fetch(`${URL}/api/posts`);
  const posts = await response.json();

  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
