const URL = "https://nofunmondays.com";

function generateNewsSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    ${posts
      .map(({ slug, createdAt, title }) => {
        return `
          <url>
            <loc>${`${URL}/blog/${slug}`}</loc>
            <news:news>
              <news:publication>
                <news:name>No Fun Mondays</news:name>
                <news:language>en</news:language>
              </news:publication>
              <news:publication_date>${new Date(createdAt).toISOString()}</news:publication_date>
              <news:title>${title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</news:title>
            </news:news>
          </url>
        `;
      })
      .join("")}
  </urlset>`;
}

export async function getServerSideProps({ res }) {
  try {
    const response = await fetch(`${URL}/api/posts/recent?type=all`);
    const text = await response.text();
    const posts = JSON.parse(text);

    if (!Array.isArray(posts)) {
      throw new Error("Expected an array but got something else");
    }

    const recentPosts = posts.filter((post) => {
      const postDate = new Date(post.createdAt);
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      return postDate >= twoDaysAgo;
    });

    const sitemap = generateNewsSiteMap(recentPosts);

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error("Error generating news sitemap:", error);
    res.statusCode = 500;
    res.end("Error generating news sitemap");
  }

  return { props: {} };
}

export default function NewsSiteMap() {}