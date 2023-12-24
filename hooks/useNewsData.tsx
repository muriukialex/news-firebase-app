import { fetchNewsData } from "@/lib/request"
import useSWR from "swr"
import { endpoint } from "@/lib/request"


const useNewsData = () =>{
  const { isLoading, data, error, mutate } = useSWR(`${endpoint}/top-headlines`, 
    () => fetchNewsData())

  return {
    isLoading,
    data,
    error,
    mutate
  }
}

export default useNewsData