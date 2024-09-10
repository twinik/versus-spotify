import axios from "axios"

const SPOTIFY_GET_ACCESS_TOKEN_URL = process.env.SPOTIFY_GET_ACCESS_TOKEN_URL

export async function getAccessToken(): Promise<string> {
	const response = await axios.post(SPOTIFY_GET_ACCESS_TOKEN_URL as string, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		grant_type: "client_credentials",
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
	})
	return response.data.access_token
}

export async function getRefreshToken(): Promise<string> {
	const response = await axios.post(SPOTIFY_GET_ACCESS_TOKEN_URL as string, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		grant_type: "refresh_token",
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
	})
	return response.data.refresh_token
}

export async function getUserToken(): Promise<string> {
	const response = await axios.post(SPOTIFY_GET_ACCESS_TOKEN_URL as string, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		grant_type: "authorization_code",
		client_id: process.env.CLIENT_ID,
		client_secret: process.env.CLIENT_SECRET,
	})
	return response.data.access_token
}
