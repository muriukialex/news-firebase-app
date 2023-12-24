import axios from "axios"
import { NewsArticlesDataAPIResults } from "@/types"

export const endpoint = process.env.NEXT_PUBLIC_NEWS_ENDPOINT
export const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY

export const fetchNewsData = (): Promise<NewsArticlesDataAPIResults> =>{
  return axios.get(`${endpoint}/top-headlines?country=us&apiKey=${apiKey}`)
}