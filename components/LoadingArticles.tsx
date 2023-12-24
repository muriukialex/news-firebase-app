import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const LoadingArticles = () => {
  return (
    <div className="mt-6 mx-auto max-w-screen-md">
      <SkeletonTheme baseColor="#a9a9a9" highlightColor="#808080">
        <Skeleton count={10} style={{ height: "15rem" }} />
      </SkeletonTheme>
    </div>
  )
}

export default LoadingArticles