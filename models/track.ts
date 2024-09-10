export interface Track {
    name: string
    album: {
        name: string
        images: {
            url: string
            width: number
            height: number
        }[]
    }   
    artists: {
        name: string
    }[]
    duration_ms: number
    explicit: boolean
    id: string
    preview_url: string
    track_number: number
    popularity: number
}
