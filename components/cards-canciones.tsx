/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Music, BarChart } from "lucide-react";
import Searcher from "@/components/searcher";
import { getTrack } from "@/services/spotify";
import { Track } from "@/models/track";

export default function CardCanciones() {
	const [track1, setTrack1] = useState<Track>();
	const [track2, setTrack2] = useState<Track>();

	useEffect(() => {
		const fetchTracks = async () => {
			const trackData1 = await getTrack("61qPUnazSdkvua4wgA4L8C");
			const trackData2 = await getTrack("3Q4U2lpNqKR0URvGkB78L2");
			setTrack1(trackData1);
			setTrack2(trackData2);
		};
		fetchTracks();
	}, []);

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
				placeholder="canción"
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
