import Searcher from "@/components/searcher";
import { getArtistDetails } from "@/services/spotify";
import { Artist } from "@/models/Spotify";
import { ArtistCard } from "@/components/ArtistCard";

interface CardArtistasProps {
	artist1: Artist | undefined;
	artist2: Artist | undefined;
	setArtist1: (artist: Artist) => void;
	setArtist2: (artist: Artist) => void;
	loadingArtists: boolean;
}

export default function CardArtistas({
	artist1,
	artist2,
	setArtist1,
	setArtist2,
	loadingArtists,
}: CardArtistasProps) {
	const handleSetArtist1 = (value: unknown) => {
		setArtist1(value as Artist);
	};

	const handleSetArtist2 = (value: unknown) => {
		setArtist2(value as Artist);
	};

	return (
		<>
			<Searcher
				typeSearch="artist"
				placeholder="artista"
				service={getArtistDetails}
				setItem1={handleSetArtist1}
				setItem2={handleSetArtist2}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<ArtistCard artist={artist1} loading={loadingArtists} />
				<ArtistCard artist={artist2} loading={loadingArtists} />
			</div>
		</>
	);
}
