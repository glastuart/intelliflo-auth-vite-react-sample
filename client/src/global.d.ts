declare global {
    type IntellifloLink = {
        id: number
        name: string
        href: string
    }
    type IntellifloListResponse<T> = {
        href: string
        items: T[]
        count: number
    }
}

export {};