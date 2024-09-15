"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Disc, Music, User } from "lucide-react";
import { getArtistDetails, getAlbum, getTrack } from "@/services/spotify";
import { Artist, Album, Track } from "@/models/Spotify";
import CardsArtistas from "@/components/cards-artistas";
import CardsCanciones from "@/components/cards-canciones";
import CardsAlbumes from "@/components/cards-albumes";
import ModeToggle from "@/components/ModeToggle";

export default function Home() {
	const [artist1, setArtist1] = useState<Artist>();
	const [artist2, setArtist2] = useState<Artist>();
	const [track1, setTrack1] = useState<Track>();
	const [track2, setTrack2] = useState<Track>();
	const [album1, setAlbum1] = useState<Album>();
	const [album2, setAlbum2] = useState<Album>();
	const [loadingArtists, setLoadingArtists] = useState(false);
	const [loadingTracks, setLoadingTracks] = useState(false);
	const [loadingAlbums, setLoadingAlbums] = useState(false);

	useEffect(() => {
		const fetchArtists = async () => {
			setLoadingArtists(true);
			try {
				const [artistData1, artistData2] = await Promise.all([
					getArtistDetails("2DaxqgrOhkeH0fpeiQq2f4"),
					getArtistDetails("0SnyKkoyBaB2fG8IJH4xmU"),
				]);
				setArtist1(artistData1);
				setArtist2(artistData2);
			} catch (error) {
				console.error("Error fetching artists:", error);
			} finally {
				setLoadingArtists(false);
			}
		};
		const fetchTracks = async () => {
			setLoadingTracks(true);
			try {
				const [trackData1, trackData2] = await Promise.all([
					getTrack("61qPUnazSdkvua4wgA4L8C"),
					getTrack("3Q4U2lpNqKR0URvGkB78L2"),
				]);
				setTrack1(trackData1);
				setTrack2(trackData2);
			} catch (error) {
				console.error("Error fetching tracks:", error);
			} finally {
				setLoadingTracks(false);
			}
		};
		const fetchAlbums = async () => {
			setLoadingAlbums(true);
			try {
				const [albumData1, albumData2] = await Promise.all([
					getAlbum("7FYLw9fTOiYnJFbFk2Mntn"),
					getAlbum("0aPjWHFy8wvMwUBhWVq6TV"),
				]);
				setAlbum1(albumData1);
				setAlbum2(albumData2);
			} catch (error) {
				console.error("Error fetching albums:", error);
			} finally {
				setLoadingAlbums(false);
			}
		};
		fetchArtists();
		fetchTracks();
		fetchAlbums();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 dark:from-green-900 dark:to-blue-900 p-4 md:p-8 transition-colors duration-300">
			<div className="absolute top-4 right-4 z-50">
				<ModeToggle />
			</div>
			<header className="mb-8 text-center mt-5">
				<h1 className="text-5xl font-bold text-white mb-2">Versus Spotify</h1>
				<p className="text-xl text-white">
					Compara tus artistas, canciones y álbumes favoritos
				</p>
			</header>

			<div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md rounded-lg shadow-2xl p-6 transition-colors duration-300">
				<Tabs defaultValue="artists" className="mb-6">
					<TabsList className="grid w-full grid-cols-3 gap-2 p-1 bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-600 rounded-lg">
						<TabsTrigger
							value="artists"
							className="rounded-md font-semibold text-gray-100 transition-all data-[state=active]:bg-white data-[state=active]:text-green-600 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-green-400 data-[state=active]:shadow-lg hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-700 dark:hover:text-green-100"
						>
							<User className="mr-2 h-4 w-4" />
							Artistas
						</TabsTrigger>
						<TabsTrigger
							value="songs"
							className="rounded-md font-semibold text-gray-100 transition-all data-[state=active]:bg-white data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-lg hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-700 dark:hover:text-blue-100"
						>
							<Music className="mr-2 h-4 w-4" />
							Temas
						</TabsTrigger>
						<TabsTrigger
							value="albums"
							className="rounded-md font-semibold text-gray-100 transition-all data-[state=active]:bg-white data-[state=active]:text-teal-600 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-teal-400 data-[state=active]:shadow-lg hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-teal-700 dark:hover:text-teal-100"
						>
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
							loadingArtists={loadingArtists}
							setLoadingArtists={setLoadingArtists}
						/>
					</TabsContent>
					<TabsContent value="songs">
						<CardsCanciones
							track1={track1}
							track2={track2}
							setTrack1={setTrack1}
							setTrack2={setTrack2}
							loadingTracks={loadingTracks}
							setLoadingTracks={setLoadingTracks}
						/>
					</TabsContent>
					<TabsContent value="albums">
						<CardsAlbumes
							album1={album1}
							album2={album2}
							setAlbum1={setAlbum1}
							setAlbum2={setAlbum2}
							loadingAlbums={loadingAlbums}
							setLoadingAlbums={setLoadingAlbums}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
