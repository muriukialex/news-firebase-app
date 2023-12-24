import type { UserCredential } from "firebase/auth"

export interface UserDataType {
    email: string
    password: string
}

export interface ButtonStatusType {
    status: "idle" | "processing"
} 

export type SignInSignUpErrorResponse = { user: UserCredential } | {
    errorMessage: string
}

export interface NewsArticlesData {
    "source": {
        "id": string | null,
        "name": string
    },
    "author": string
    "title": string
    "description": string
    "url": string
    "urlToImage": string
    "publishedAt": string
    "content": string
}

export interface NewsArticlesDataAPIResults {
    data:{
        "status": string
        "totalResults": number
        "articles": Array<NewsArticlesData>
    }
}