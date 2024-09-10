export interface Artista {
    name: string
    genres: string[]
    images: {
        url: string
        width: number
        height: number
    }[]
	followers: {
		total: number
    }
    popularity: number
}