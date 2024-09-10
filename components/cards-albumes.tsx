/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Music, BarChart } from "lucide-react";
import Searcher from "@/components/searcher";
import { getAlbum } from "@/services/spotify";
import { Album } from "@/models/album";

export default function CardArtistas() {
	const [album1, setAlbum1] = useState<Album>();
	const [album2, setAlbum2] = useState<Album>();

	useEffect(() => {
		const fetchAlbums = async () => {
			const albumData1 = await getAlbum("7FYLw9fTOiYnJFbFk2Mntn");
			const albumData2 = await getAlbum("0aPjWHFy8wvMwUBhWVq6TV");
			setAlbum1(albumData1);
			setAlbum2(albumData2);
		};
		fetchAlbums();
	}, []);

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
				<Card className="bg-white bg-opacity-50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
					<CardHeader>
						<CardTitle>{album1?.name}</CardTitle>
					</CardHeader>
					<CardContent>
						{album1?.images[0]?.url ? (
							<img
								src={album1?.images[0].url}
								alt={album1?.name}
								width={album1?.images[0].width}
								height={album1?.images[0].height}
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
						<CardTitle>{album2?.name}</CardTitle>
					</CardHeader>
					<CardContent>
						{album2?.images[0]?.url ? (
							<img
								src={album2?.images[0].url}
								alt={album2?.name}
								width={album2?.images[0].width}
								height={album2?.images[0].height}
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
