import { useArticle } from "@/context/ArticleContext"

const Article = () => {
  const {article} = useArticle()

  console.log("article", article)

  return (
    <div>
      <h1>{article?.title}</h1>
    </div>

  )
}

export default Article