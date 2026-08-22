import axios from "axios";
import { baseUrl } from "../utils/Data/config";

const PAGE_SIZE = 50;

export async function fetchAllBlogs() {
  try {
    const firstPage = await axios.get(
      `${baseUrl}/blogs?pagination[pageSize]=${PAGE_SIZE}&pagination[page]=1&populate=*`,
    );
    if (firstPage.status !== 200 || !Array.isArray(firstPage.data?.data)) {
      return [];
    }

    const blogs = [...firstPage.data.data];
    const pageCount = firstPage.data.meta?.pagination?.pageCount ?? 1;

    const remainingPages = await Promise.all(
      Array.from({ length: Math.max(pageCount - 1, 0) }, (_, index) =>
        axios
          .get(
            `${baseUrl}/blogs?pagination[pageSize]=${PAGE_SIZE}&pagination[page]=${
              index + 2
            }&populate=*`,
          )
          .catch(() => null),
      ),
    );

    remainingPages.forEach((response) => {
      if (response?.status === 200 && Array.isArray(response.data?.data)) {
        blogs.push(...response.data.data);
      }
    });

    return blogs;
  } catch {
    return [];
  }
}
