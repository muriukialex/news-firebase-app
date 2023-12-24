"use client"

import { NewsArticlesData } from "@/types"
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"


interface ContextProps {
    article: NewsArticlesData | null
    setArticle: Dispatch<SetStateAction<NewsArticlesData | null>>
}

const ArticleContext = createContext({} as ContextProps)

const ArticleProvider = ({ children }: {children: ReactNode}) =>{
  const [article, setArticle] = useState<NewsArticlesData | null>(null)

  const contextValue = {
    article,
    setArticle,
  }

  return (
    <ArticleContext.Provider value={contextValue}>
      {children}
    </ArticleContext.Provider>
  )
}

export const useArticle = () => {
  return useContext(ArticleContext)
}

export default ArticleProvider