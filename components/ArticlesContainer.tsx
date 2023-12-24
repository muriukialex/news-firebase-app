import type { NewsArticlesData } from "@/types"
import { useArticle } from "@/context/ArticleContext"
// import Link from "next/link"

const ArticlesContainer = ({articles} :{articles? : Array<NewsArticlesData>}) =>{
  const { setArticle } = useArticle()
  const validArticles = articles?.filter((article) => article.title !== "[Removed]")
  const handleSetArticleToContext = (article: NewsArticlesData) =>{
    setArticle(article)
    console.log(article)
  }

  return (
    validArticles?.map(article=>(
      <section className="mt-6 mx-auto max-w-screen-md" key={article.source.id}>
        <div 
          // href={"/home/article"} 
          id="articlesContainer" 
          onClick={() => handleSetArticleToContext(article)}
        >
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-400">{article.description}</p>
            <p className="text-gray-400">{article.content}</p>
            <p className="text-gray-400">{article.author}</p>
            <p className="text-gray-400">{article.publishedAt}</p>
          </div>
        </div>
        <a href={article.url} target="_blank">External link</a>
      </section>
    ))
  )
}

export default ArticlesContainer