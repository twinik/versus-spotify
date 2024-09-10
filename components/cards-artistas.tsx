/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Music, BarChart } from "lucide-react";
import Searcher from "@/components/searcher";
import { getArtist } from "@/services/spotify";
import { Artist } from "@/models/artist";

interface CardArtistasProps {
	artist1: Artist | undefined;
	artist2: Artist | undefined;
	setArtist1: (artist: Artist) => void;
	setArtist2: (artist: Artist) => void;
}

export default function CardArtistas({
	artist1,
	artist2,
	setArtist1,
	setArtist2,
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
				service={getArtist}
				setItem1={handleSetArtist1}
				setItem2={handleSetArtist2}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card className="bg-white bg-opacity-50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
					<CardHeader>
						<CardTitle>{artist1?.name}</CardTitle>
					</CardHeader>
					<CardContent>
						{artist1?.images[0]?.url ? (
							<img
								src={artist1?.images[0].url}
								alt={artist1?.name}
								width={artist1?.images[0].width}
								height={artist1?.images[0].height}
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
								<span>Popularidad: {artist1?.popularity}</span>
							</div>
							<div className="flex items-center">
								<BarChart className="mr-2" />
								<span>Seguidores: {artist1?.followers.total}</span>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="bg-white bg-opacity-50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
					<CardHeader>
						<CardTitle>{artist2?.name}</CardTitle>
					</CardHeader>
					<CardContent>
						{artist2?.images[0]?.url ? (
							<img
								src={artist2?.images[0].url}
								alt={artist2?.name}
								width={artist2?.images[0].width}
								height={artist2?.images[0].height}
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
								<span>Popularidad: {artist2?.popularity}</span>
							</div>
							<div className="flex items-center">
								<BarChart className="mr-2" />
								<span>Seguidores: {artist2?.followers.total}</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
