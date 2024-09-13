import Searcher from "@/components/searcher";
import { getAlbum } from "@/services/spotify";
import { Album } from "@/models/Spotify";
import { AlbumCard } from "@/components/AlbumCard";

interface CardAlbumesProps {
	album1: Album | undefined;
	album2: Album | undefined;
	setAlbum1: (album: Album) => void;
	setAlbum2: (album: Album) => void;
	loadingAlbums: boolean;
}

export default function CardAlbumes({
	album1,
	album2,
	setAlbum1,
	setAlbum2,
	loadingAlbums,
}: CardAlbumesProps) {
	const handleSetAlbum1 = (value: unknown) => {
		setAlbum1(value as Album);
	};

	const handleSetAlbum2 = (value: unknown) => {
		setAlbum2(value as Album);
	};

	return (
		<>
			<Searcher
				typeSearch="album"
				placeholder="álbum"
				service={getAlbum}
				setItem1={handleSetAlbum1}
				setItem2={handleSetAlbum2}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<AlbumCard album={album1} loading={loadingAlbums} />
				<AlbumCard album={album2} loading={loadingAlbums} />
			</div>
		</>
	);
}
