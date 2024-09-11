import axios from "axios";
import { getAccessToken } from "@/services/auth";
import { Artist } from "@/models/Spotify";

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

export async function getArtistDetails(artistId: string): Promise<Artist> {
	const token = await getAccessToken();

	const artistResponse = await axios.get(
		`${SPOTIFY_BASE_URL}/artists/${artistId}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	const tracksResponse = await axios.get(
		`${SPOTIFY_BASE_URL}/artists/${artistId}/top-tracks?market=US`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	const albumsResponse = await axios.get(
		`${SPOTIFY_BASE_URL}/artists/${artistId}/albums?include_groups=album,single`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	const totalAlbums = albumsResponse.data.items.length;
	const topTracks = tracksResponse.data.tracks;

	/* const albumTracksPromises = albumsResponse.data.items.map(
		async (album: Album) => {
			const albumTracks = await axios.get(
				`${SPOTIFY_BASE_URL}/albums/${album.id}/tracks`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return albumTracks.data.items.length;
		}
	);

	const albumTracksCounts = await Promise.all(albumTracksPromises);
	const totalTracksCount = albumTracksCounts.reduce(
		(sum: number, count: number) => sum + count,
		0
	); */

	const artist = artistResponse.data;
	artist.totalAlbums = totalAlbums;
	artist.topTracks = topTracks;
	//artist.totalTracksCount = totalTracksCount;

	return artist;
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
