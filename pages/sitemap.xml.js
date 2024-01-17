import axios from "axios";
import { baseUrl } from "../utils/Data/config";

const URL = "https://www.lighthouse.storage";

function generateSiteMap(posts) {
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
	<url>
		<loc>
			${URL}/
		</loc>
		<lastmod>
			2023-08-29T14:24:13+00:00
		</lastmod>
		<changefreq>weekly</changefreq>
<priority>0.8</priority>
	</url>
	<url>
		<loc>
			${URL}/blogs
		</loc>
		<lastmod>
			2023-08-29T14:24:13+00:00
		</lastmod>
		<changefreq>weekly</changefreq>
<priority>0.8</priority>
	</url>
	<url>
		<loc>
			${URL}/documentation
		</loc>
		<lastmod>
			2023-08-29T14:24:13+00:00
		</lastmod>
		<changefreq>weekly</changefreq>
<priority>0.9</priority>
	</url>
	<url>
		<loc>
			${URL}/faq
		</loc>
		<lastmod>
			2023-08-29T14:24:13+00:00
		</lastmod>
		<changefreq>weekly</changefreq>
<priority>0.5</priority>
	</url>
     ${posts
       .map(({ id, attributes }) => {
         return `
           <url>
               <loc>${`${URL}/blogs/${encodeURIComponent(
                 attributes?.title?.trim()
               )}`}</loc>
               	<lastmod>
			${attributes?.updatedAt}
		</lastmod>
		<changefreq>weekly</changefreq>
<priority>0.3</priority>
           </url>
         `;
       })
       .join("")}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  // Generate the XML sitemap with the blog data

  try {
    const response = await axios.get(`${baseUrl}/blogs?populate=*`);
    const blogsData =
      response["status"] === 200 ? response["data"]?.["data"] : null;
    const sitemap = generateSiteMap(blogsData);
    console.log(sitemap);
    res.setHeader("Content-Type", "text/xml");
    // Send the XML to the browser
    res.write(sitemap);
    res.end();
  } catch (err) {
    console.log(err);
  }

  return {
    props: {},
  };
}

export default function SiteMap() {}
