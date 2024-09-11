export interface Artist {
	external_urls: Externalurls;
	followers: Followers;
	genres: string[];
	href: string;
	id: string;
	images: Image[];
	name: string;
	popularity: number;
	type: string;
	uri: string;
	totalAlbums: number;
	totalTracksCount: number;
	topTracks: Track[];
}

interface Image {
	url: string;
	height: number;
	width: number;
}

interface Followers {
	href: null;
	total: number;
}

interface Externalurls {
	spotify: string;
}

// -------------------------------------------------------------

export interface Album {
	album_type: string;
	total_tracks: number;
	available_markets: string[];
	external_urls: Externalurls;
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	type: string;
	uri: string;
	artists: Artist[];
	tracks: Tracks;
	copyrights: Copyright[];
	external_ids: Externalids;
	genres: string[];
	label: string;
	popularity: number;
}

interface Externalids {
	upc: string;
}

interface Copyright {
	text: string;
	type: string;
}

interface Tracks {
	href: string;
	limit: number;
	next: null;
	offset: number;
	previous: null;
	total: number;
	items: Item[];
}

interface Item {
	artists: Artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_urls: Externalurls;
	href: string;
	id: string;
	name: string;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
	is_local: boolean;
}

interface Image {
	url: string;
	height: number;
	width: number;
}

interface Externalurls {
	spotify: string;
}

// -------------------------------------------------------------

export interface Track {
	album: Album;
	artists: Artist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: Externalids;
	external_urls: Externalurls;
	href: string;
	id: string;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
	is_local: boolean;
}

interface Externalids {
	isrc: string;
}

interface Image {
	url: string;
	height: number;
	width: number;
}

interface Externalurls {
	spotify: string;
}
