function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://nofunmondays.com/</loc>
    </url>
    <url>
        <loc>https://nofunmondays.com/contact</loc>
    </url>
    <url>
        <loc>https://nofunmondays.com/fortnite/item-shop</loc>
    </url>
     <url>
        <loc>https://nofunmondays.com/fortnite/challenges</loc>
    </url>
     <url>
        <loc>https://nofunmondays.com/fortnite/countdown</loc>
    </url>
     ${posts
       ?.map(({ slug, createdAt }) => {
         return `
           <url>
               <loc>${`https://nofunmondays.com/blog/${slug}`}</loc>
               <lastmod>${new Date(createdAt).toISOString()}</lastmod>
           </url>
         `;
       })
       .join("")}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  try {
    const response = await fetch(`https://nofunmondays.com/api/posts/recent?type=all`);
    const text = await response.text();


    const posts = JSON.parse(text); 
    if (!Array.isArray(posts)) {
      throw new Error("Expected an array but got something else");
    }

    const sitemap = generateSiteMap(posts);

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.statusCode = 500;
    res.end("Error generating sitemap");
  }

  return { props: {} };
}

export default function SiteMap() {}