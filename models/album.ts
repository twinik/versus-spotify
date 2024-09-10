export interface Album {
    name: string
    images: {
        url: string
        width: number
        height: number
    }[]
    artists: {
        name: string
    }[]
}