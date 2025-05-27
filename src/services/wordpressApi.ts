
interface WordPressPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media?: number;
  acf?: any;
  date: string;
  slug: string;
}

interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
  };
}

interface WordPressPage {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf?: any;
  slug: string;
}

class WordPressService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  async fetchPosts(params?: { per_page?: number; categories?: string }): Promise<WordPressPost[]> {
    const queryParams = new URLSearchParams();
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.categories) queryParams.append('categories', params.categories);

    const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/posts?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  }

  async fetchPage(slug: string): Promise<WordPressPage | null> {
    const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/pages?slug=${slug}`);
    if (!response.ok) throw new Error('Failed to fetch page');
    const pages = await response.json();
    return pages.length > 0 ? pages[0] : null;
  }

  async fetchMedia(id: number): Promise<WordPressMedia | null> {
    const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/media/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async fetchCustomPostType(postType: string, params?: { per_page?: number }): Promise<any[]> {
    const queryParams = new URLSearchParams();
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());

    const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/${postType}?${queryParams}`);
    if (!response.ok) throw new Error(`Failed to fetch ${postType}`);
    return response.json();
  }

  stripHtml(html: string): string {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }
}

// Default instance - you can change this URL to your WordPress site
export const wordpressApi = new WordPressService('https://your-wordpress-site.com');

export type { WordPressPost, WordPressMedia, WordPressPage };
