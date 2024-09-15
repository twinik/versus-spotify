import Searcher from "@/components/searcher";
import { getTrack } from "@/services/spotify";
import { Track } from "@/models/Spotify";
import { TrackCard } from "@/components/TrackCard";

interface CardCancionesProps {
	track1: Track | undefined;
	track2: Track | undefined;
	setTrack1: (track: Track) => void;
	setTrack2: (track: Track) => void;
	loadingTracks: boolean;
	setLoadingTracks: (loading: boolean) => void;
}

export default function CardCanciones({
	track1,
	track2,
	setTrack1,
	setTrack2,
	loadingTracks,
	setLoadingTracks,
}: CardCancionesProps) {
	const handleSetTrack1 = (value: unknown) => {
		setTrack1(value as Track);
	};

	const handleSetTrack2 = (value: unknown) => {
		setTrack2(value as Track);
	};

	const handleSetLoading = (
		loading: boolean | ((prev: boolean) => boolean)
	) => {
		setLoadingTracks(
			typeof loading === "function" ? loading(loadingTracks) : loading
		);
	};

	return (
		<>
			<Searcher
				typeSearch="track"
				placeholder="tema"
				service={getTrack}
				setItem1={handleSetTrack1}
				setItem2={handleSetTrack2}
				setLoading={handleSetLoading}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<TrackCard track={track1} loading={loadingTracks} />
				<TrackCard track={track2} loading={loadingTracks} />
			</div>
		</>
	);
}
