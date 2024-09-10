import axios from "axios"
import { getAccessToken } from "@/services/auth"

const SPOTIFY_BASE_URL = process.env.SPOTIFY_BASE_URL

export async function getArtist(artistId: string) {
	const token = await getAccessToken()
	const response = await axios.get(`${SPOTIFY_BASE_URL}/artists/${artistId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return response.data
}

export async function getTrack(trackId: string) {
	const token = await getAccessToken()
	const response = await axios.get(`${SPOTIFY_BASE_URL}/tracks/${trackId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return response.data
}

export async function getAlbum(albumId: string) {
	const token = await getAccessToken()
	const response = await axios.get(`${SPOTIFY_BASE_URL}/albums/${albumId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return response.data
}
