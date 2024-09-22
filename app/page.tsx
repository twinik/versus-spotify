"use client";

import { useEffect, useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Disc, Music, User } from "lucide-react";
import { getArtistDetails, getAlbum, getTrack } from "@/services/spotify";
import { Artist, Album, Track } from "@/models/Spotify";
import CardsArtistas from "@/components/cards-artistas";
import CardsCanciones from "@/components/cards-canciones";
import CardsAlbumes from "@/components/cards-albumes";
import ModeToggle from "@/components/ModeToggle";
import { motion, AnimatePresence } from "framer-motion";

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
	const [activeTab, setActiveTab] = useState("artists");
	const [direction, setDirection] = useState(0);
	const [dimensions, setDimensions] = useState({ width: 0, left: 0 });
	const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

	useEffect(() => {
		const fetchArtists = async () => {
			setLoadingArtists(true);
			try {
				const [artistData1, artistData2] = await Promise.all([
					getArtistDetails("3qm84nBOXUEQ2vnTfUTTFC"),
					getArtistDetails("58lV9VcRSjABbAbfWS6skp"),
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
					getTrack("67Q93kXygxCskeQiIP0V0j"),
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

	useEffect(() => {
		const activeTabElement =
			tabsRef.current[["artists", "songs", "albums"].indexOf(activeTab)];
		if (activeTabElement) {
			setDimensions({
				width: activeTabElement.offsetWidth,
				left: activeTabElement.offsetLeft,
			});
		}
	}, [activeTab]);

	const handleTabChange = (newTab: string) => {
		const tabOrder = ["artists", "songs", "albums"];
		const oldIndex = tabOrder.indexOf(activeTab);
		const newIndex = tabOrder.indexOf(newTab);
		setDirection(newIndex > oldIndex ? 1 : -1);
		setActiveTab(newTab);
	};

	const tabVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		}),
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 dark:from-green-900 dark:to-blue-900 p-4 md:p-8 transition-colors duration-300">
			<div className="absolute top-4 right-4 z-50">
				<ModeToggle />
			</div>
			<header className="mb-8 text-center mt-10 lg:mt-5">
				<h1 className="text-5xl font-bold text-white mb-2">Versus Spotify</h1>
				<p className="text-xl text-white">
					Compara tus artistas, canciones y álbumes favoritos
				</p>
			</header>

			<div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md rounded-lg shadow-2xl p-6 transition-colors duration-300">
				<Tabs
					value={activeTab}
					onValueChange={handleTabChange}
					className="mb-6"
				>
					<TabsList className="relative grid w-full grid-cols-3 gap-2 p-1 bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-600 rounded-lg">
						<motion.div
							className="absolute top-1 bottom-1 bg-white dark:bg-gray-800 rounded-md shadow-md z-10"
							initial={false}
							animate={{
								width: dimensions.width - 16,
								left: dimensions.left + 8,
							}}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 30,
								duration: 0.5,
							}}
						/>
						{["artists", "songs", "albums"].map((tab, index) => (
							<TabsTrigger
								key={tab}
								ref={(el) => (tabsRef.current[index] = el)}
								value={tab}
								className="relative rounded-md font-semibold text-gray-100 transition-all data-[state=active]:bg-white data-[state=active]:text-green-600 dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-green-400 data-[state=active]:shadow-lg hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-700 dark:hover:text-green-100 z-20"
							>
								{tab === "artists" && <User className="mr-2 h-4 w-4" />}
								{tab === "songs" && <Music className="mr-2 h-4 w-4" />}
								{tab === "albums" && <Disc className="mr-2 h-4 w-4" />}
								{tab === "artists"
									? "Artistas"
									: tab === "songs"
									? "Temas"
									: "Álbumes"}
							</TabsTrigger>
						))}
					</TabsList>

					<div className="relative overflow-hidden">
						<AnimatePresence initial={false} custom={direction}>
							<motion.div
								key={activeTab}
								custom={direction}
								variants={tabVariants}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{
									x: {
										type: "spring",
										stiffness: 200,
										damping: 30,
										duration: 0.5,
									},
									opacity: { duration: 0.3 },
								}}
								className="w-full"
								drag="x"
								dragConstraints={{ left: 0, right: 0 }}
								dragElastic={0.5}
								onDragEnd={(e, { offset, velocity }) => {
									const swipe = swipePower(offset.x, velocity.x);
									if (swipe < -swipeConfidenceThreshold) {
										const newIndex =
											["artists", "songs", "albums"].indexOf(activeTab) + 1;
										if (newIndex < 3)
											handleTabChange(["artists", "songs", "albums"][newIndex]);
									} else if (swipe > swipeConfidenceThreshold) {
										const newIndex =
											["artists", "songs", "albums"].indexOf(activeTab) - 1;
										if (newIndex >= 0)
											handleTabChange(["artists", "songs", "albums"][newIndex]);
									}
								}}
							>
								{activeTab === "artists" && (
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
								)}
								{activeTab === "songs" && (
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
								)}
								{activeTab === "albums" && (
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
								)}
							</motion.div>
						</AnimatePresence>
					</div>
				</Tabs>
			</div>
		</div>
	);
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};
