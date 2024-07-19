const NewsAPI = require('newsapi');
import dotenv from 'dotenv';

dotenv.config();

const { NEWS_API }: NodeJS.ProcessEnv = process.env;
const newsapi = new NewsAPI(NEWS_API);

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

const queries = {
  getFeatures: async () => {
    try {
      const response: NewsResponse = await newsapi.v2.topHeadlines({
        // sources: 'bbc-news,the-verge',
        q: 'bitcoin',
        category: 'business',
        language: 'en',
        country: 'us'
      });
  
      const formattedArticles = response.articles.map((article: Article) => ({
        title: article.title,
        description: article.description,
        publishedAt: article.publishedAt,
        url: article.url,
        imageUrl: article.urlToImage
      }));
      return formattedArticles;
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }
};

export const resolvers = { queries };