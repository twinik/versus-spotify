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
}

export default function CardCanciones({
	track1,
	track2,
	setTrack1,
	setTrack2,
	loadingTracks,
}: CardCancionesProps) {
	const handleSetTrack1 = (value: unknown) => {
		setTrack1(value as Track);
	};

	const handleSetTrack2 = (value: unknown) => {
		setTrack2(value as Track);
	};

	return (
		<>
			<Searcher
				typeSearch="track"
				placeholder="tema"
				service={getTrack}
				setItem1={handleSetTrack1}
				setItem2={handleSetTrack2}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<TrackCard track={track1} loading={loadingTracks} />
				<TrackCard track={track2} loading={loadingTracks} />
			</div>
		</>
	);
}
