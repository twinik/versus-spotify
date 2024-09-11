/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Music, BarChart } from "lucide-react";
import Searcher from "@/components/searcher";
import { getTrack } from "@/services/spotify";
import { Track } from "@/models/Spotify";

interface CardCancionesProps {
	track1: Track | undefined;
	track2: Track | undefined;
	setTrack1: (track: Track) => void;
	setTrack2: (track: Track) => void;
}

export default function CardCanciones({
	track1,
	track2,
	setTrack1,
	setTrack2,
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
				<Card className="bg-white bg-opacity-50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
					<CardHeader>
						<CardTitle>{track1?.name}</CardTitle>
					</CardHeader>
					<CardContent>
						{track1?.album.images[0]?.url ? (
							<img
								src={track1?.album.images[0].url}
								alt={track1?.name}
								width={track1?.album.images[0].width}
								height={track1?.album.images[0].height}
								className="rounded-md"
							/>
						) : (
							<div className="flex items-center justify-center h-48 bg-gray-100 rounded-md overflow-hidden">
								<User className="h-24 w-24 text-gray-400" />
							</div>
						)}
						<div className="mt-4 space-y-2">
							<div className="flex items-center">
								<Music className="mr-2" />
								<span>Popularidad: 85</span>
							</div>
							<div className="flex items-center">
								<BarChart className="mr-2" />
								<span>Seguidores: 1M</span>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="bg-white bg-opacity-50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
					<CardHeader>
						<CardTitle>{track2?.name}</CardTitle>
					</CardHeader>
					<CardContent>
						{track2?.album.images[0]?.url ? (
							<img
								src={track2?.album.images[0].url}
								alt={track2?.name}
								width={track2?.album.images[0].width}
								height={track2?.album.images[0].height}
								className="rounded-md"
							/>
						) : (
							<div className="flex items-center justify-center h-48 bg-gray-100 rounded-md overflow-hidden">
								<User className="h-24 w-24 text-gray-400" />
							</div>
						)}
						<div className="mt-4 space-y-2">
							<div className="flex items-center">
								<Music className="mr-2" />
								<span>Popularidad: 92</span>
							</div>
							<div className="flex items-center">
								<BarChart className="mr-2" />
								<span>Seguidores: 2.5M</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
