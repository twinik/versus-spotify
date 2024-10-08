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
	setLoadingAlbums: (loading: boolean) => void;
}

export default function CardAlbumes({
	album1,
	album2,
	setAlbum1,
	setAlbum2,
	loadingAlbums,
	setLoadingAlbums,
}: CardAlbumesProps) {
	const handleSetAlbum1 = (value: unknown) => {
		setAlbum1(value as Album);
	};

	const handleSetAlbum2 = (value: unknown) => {
		setAlbum2(value as Album);
	};

	const handleSetLoading = (
		loading: boolean | ((prev: boolean) => boolean)
	) => {
		setLoadingAlbums(
			typeof loading === "function" ? loading(loadingAlbums) : loading
		);
	};

	return (
		<>
			<Searcher
				typeSearch="album"
				placeholder="álbum"
				service={getAlbum}
				setItem1={handleSetAlbum1}
				setItem2={handleSetAlbum2}
				setLoading={handleSetLoading}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<AlbumCard album={album1} loading={loadingAlbums} />
				<AlbumCard album={album2} loading={loadingAlbums} />
			</div>
		</>
	);
}
