import axios from "axios"
import qs from "qs"
import { generateCodeChallenge, codeVerifier } from "./auth_utils"

const SPOTIFY_GET_ACCESS_TOKEN_URL =
	process.env.NEXT_PUBLIC_SPOTIFY_GET_ACCESS_TOKEN_URL
const SPOTIFY_GET_USER_AUTHORIZATION_URL =
	process.env.NEXT_PUBLIC_SPOTIFY_GET_USER_AUTHORIZATION_URL
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI

export async function getAccessToken(): Promise<string> {
	const storedToken = localStorage.getItem("accessToken")
	const tokenExpiry = localStorage.getItem("accessTokenExpiry")

	if (storedToken && tokenExpiry && Date.now() < parseInt(tokenExpiry)) {
		return storedToken
	}

	const response = await axios.post(SPOTIFY_GET_ACCESS_TOKEN_URL as string, 
           qs.stringify({
               grant_type: "client_credentials",
               client_id: CLIENT_ID,
               client_secret: CLIENT_SECRET,
           }), {
               headers: {
                   "Content-Type": "application/x-www-form-urlencoded",
               },
		}
	)
	const accessToken = response.data.access_token
	const expiresIn = response.data.expires_in
	localStorage.setItem("accessToken", accessToken)
	localStorage.setItem(
		"accessTokenExpiry",
		(Date.now() + expiresIn * 1000).toString()
	)
	return accessToken
}

export async function getUserAuthorization(): Promise<string> {
	const response = await axios.post(
		SPOTIFY_GET_USER_AUTHORIZATION_URL as string,
		{
			response_type: "code",
			client_id: CLIENT_ID,
			scope: "user-read-private user-read-email",
			code_challenge_method: "S256",
			code_challenge: await generateCodeChallenge(),
			redirect_uri: REDIRECT_URI,
		}
	)
	return response.data
}

export async function getUserToken(code: string): Promise<string> {
	const storedToken = localStorage.getItem("userToken")
	const tokenExpiry = localStorage.getItem("userTokenExpiry")

	if (storedToken && tokenExpiry && Date.now() < parseInt(tokenExpiry)) {
		return storedToken
	}

	const response = await axios.post(
		SPOTIFY_GET_USER_AUTHORIZATION_URL as string,
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			client_id: CLIENT_ID,
			grant_type: "authorization_code",
			code: code,
			redirect_uri: REDIRECT_URI,
			code_verifier: codeVerifier,
		}
	)

	const accessToken = response.data.access_token
	const expiresIn = response.data.expires_in
	localStorage.setItem("userToken", accessToken)
	localStorage.setItem(
		"userTokenExpiry",
		(Date.now() + expiresIn * 1000).toString()
	)
	return accessToken
}

export async function getRefreshToken(): Promise<string> {
	const response = await axios.post(SPOTIFY_GET_ACCESS_TOKEN_URL as string, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		grant_type: "refresh_token",
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
	})
	return response.data.refresh_token
}
