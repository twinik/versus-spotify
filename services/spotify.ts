import axios from "axios";
import { getAccessToken } from "@/services/auth";

const SPOTIFY_BASE_URL = process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL;

export async function getArtist(artistId: string) {
	const token = await getAccessToken();
	const response = await axios.get(`${SPOTIFY_BASE_URL}/artists/${artistId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
}

export async function getTrack(trackId: string) {
	const token = await getAccessToken();
	const response = await axios.get(`${SPOTIFY_BASE_URL}/tracks/${trackId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
}

export async function getAlbum(albumId: string) {
	const token = await getAccessToken();
	const response = await axios.get(`${SPOTIFY_BASE_URL}/albums/${albumId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
}

export async function getSearch(
	searchTerm: string,
	type: string,
	limit: number = 1,
	offset: number = 0
) {
	const token = await getAccessToken();
	const response = await axios.get(
		`${SPOTIFY_BASE_URL}/search?q=${searchTerm}&type=${type}&limit=${limit}&offset=${offset}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	if (type === "artist") { 
		if (response.data.artists.items.length > 0) {
			return response.data.artists.items[0].id;
		}
	} else if (type === "track") {
		if (response.data.tracks.items.length > 0) {
			return response.data.tracks.items[0].id;
		}
	} else if (type === "album") {
		if (response.data.albums.items.length > 0) {
			return response.data.albums.items[0].id;
		}
	} 
	return null;
}
