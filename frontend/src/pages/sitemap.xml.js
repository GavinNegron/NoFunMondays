const URL = "https://nofunmondays.com";

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${`${URL}/`}</loc>
    </url>
    <url>
        <loc>${`${URL}/fortnite/item-shop`}</loc>
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
  try {
    const response = await fetch(`${URL}/api/posts/recent?type=all`);
    const text = await response.text(); // Get raw response first

    console.log("API Response:", text); // Log raw response

    const posts = JSON.parse(text); // Try parsing JSON
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