const generateRandomString = (length: number) => {
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	const values = crypto.getRandomValues(new Uint8Array(length))
	return values.reduce((acc, x) => acc + possible[x % possible.length], "")
}

export const codeVerifier = generateRandomString(64)

const sha256 = async (plain: string) => {
	const encoder = new TextEncoder()
	const data = encoder.encode(plain)
	return window.crypto.subtle.digest("SHA-256", data)
}

const base64encode = (input: Uint8Array) => {
	let binaryString = ""
	for (let i = 0; i < input.length; i++) {
		binaryString += String.fromCharCode(input[i])
	}
	return btoa(binaryString)
		.replace(/=/g, "")
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
}

export const generateCodeChallenge = async () => {
	const hashed = await sha256(codeVerifier)
	const base64encoded = base64encode(new Uint8Array(hashed))
	return base64encoded
}
