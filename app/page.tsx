"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Disc, Music, User } from "lucide-react";
import CardsArtistas from "@/components/cards-artistas";
import CardsCanciones from "@/components/cards-canciones";
import CardsAlbumes from "@/components/cards-albumes";
import { getArtist, getAlbum, getTrack } from "@/services/spotify";
import { Artist } from "@/models/artist";
import { Album } from "@/models/album";
import { Track } from "@/models/track";

export default function Home() {
	const [artist1, setArtist1] = useState<Artist>();
	const [artist2, setArtist2] = useState<Artist>();
	const [track1, setTrack1] = useState<Track>();
	const [track2, setTrack2] = useState<Track>();
	const [album1, setAlbum1] = useState<Album>();
	const [album2, setAlbum2] = useState<Album>();

	useEffect(() => {
		const fetchArtists = async () => {
			const artistData1 = await getArtist("2F9pvj94b52wGKs0OqiNi2");
			const artistData2 = await getArtist("0SnyKkoyBaB2fG8IJH4xmU");
			setArtist1(artistData1);
			setArtist2(artistData2);
		};
		const fetchAlbums = async () => {
			const albumData1 = await getAlbum("7FYLw9fTOiYnJFbFk2Mntn");
			const albumData2 = await getAlbum("0aPjWHFy8wvMwUBhWVq6TV");
			setAlbum1(albumData1);
			setAlbum2(albumData2);
		};
		const fetchTracks = async () => {
			const trackData1 = await getTrack("61qPUnazSdkvua4wgA4L8C");
			const trackData2 = await getTrack("3Q4U2lpNqKR0URvGkB78L2");
			setTrack1(trackData1);
			setTrack2(trackData2);
		};
		fetchArtists();
		fetchAlbums();
		fetchTracks();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 p-4 md:p-8">
			<header className="mb-8 text-center mt-10 lg:mt-5">
				<h1 className="text-5xl font-bold text-white mb-2 animate-pulse">
					Versus Spotify
				</h1>
				<p className="text-xl text-white">
					Compara tus artistas y canciones favoritas
				</p>
			</header>

			<div className="max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-2xl p-6">
				<Tabs defaultValue="artists" className="mb-6">
					<TabsList className="grid w-full grid-cols-3 p-1 bg-gray-100 rounded-lg">
						<TabsTrigger value="artists" className="rounded-md transition-all">
							<User className="mr-2 h-4 w-4" />
							Artistas
						</TabsTrigger>
						<TabsTrigger value="songs" className="rounded-md transition-all">
							<Music className="mr-2 h-4 w-4" />
							Canciones
						</TabsTrigger>
						<TabsTrigger value="albums" className="rounded-md transition-all">
							<Disc className="mr-2 h-4 w-4" />
							Álbumes
						</TabsTrigger>
					</TabsList>

					<TabsContent value="artists">
						<CardsArtistas
							artist1={artist1}
							artist2={artist2}
							setArtist1={setArtist1}
							setArtist2={setArtist2}
						/>
					</TabsContent>
					<TabsContent value="songs">
						<CardsCanciones
							track1={track1}
							track2={track2}
							setTrack1={setTrack1}
							setTrack2={setTrack2}
						/>
					</TabsContent>
					<TabsContent value="albums">
						<CardsAlbumes
							album1={album1}
							album2={album2}
							setAlbum1={setAlbum1}
							setAlbum2={setAlbum2}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
