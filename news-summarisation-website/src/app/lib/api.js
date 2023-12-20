import { getArticles } from '../api/newsapi';

async function getStaticProps() {
    const articles = await getArticles();
    const categories = Array.from(new Set(articles.map((article) => article.category)));
    
    return {
      props: {
        articles,
        categories,
      },
    };
}
export const getStaticProps = getStaticProps()