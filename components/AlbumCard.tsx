/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Music, Calendar, Disc, ExternalLink, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { Album } from "@/models/Spotify";
import { AlbumCardSkeleton } from "@/components/skeletons/AlbumCardSkeleton";

interface AlbumCardProps {
	album: Album | undefined;
	loading: boolean;
}

export function AlbumCard({ album, loading }: AlbumCardProps) {
	if (loading) return <AlbumCardSkeleton />;
	if (!album) return null;

	const formatDuration = (ms: number) => {
		const minutes = Math.floor(ms / 60000);
		const seconds = ((ms % 60000) / 1000).toFixed(0);
		return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
	};

	const formatDate = (date: string) => {
		const [year, month, day] = date.split("-");
		return `${day}/${month}/${year}`;
	};

	const totalDuration = album.tracks.items.reduce(
		(acc, track) => acc + track.duration_ms,
		0
	);

	return (
		<Card className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
			<div className="relative">
				{album.images[0]?.url ? (
					<img
						src={album.images[0].url}
						alt={album.name}
						className="w-full h-64 object-cover"
					/>
				) : (
					<div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
						<Music className="h-24 w-24 text-gray-400 dark:text-gray-500" />
					</div>
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
			</div>

			<CardHeader className="relative z-10 -mt-20 pb-0">
				<CardTitle className="text-2xl sm:text-3xl font-bold text-white break-words hyphens-auto">
					{album.name}
				</CardTitle>

				<div className="flex flex-wrap gap-2 -mb-6">
					{album.artists.map((artist) => (
						<Badge
							key={artist.id}
							variant="secondary"
							className="bg-blue-500 dark:bg-blue-600 text-white"
						>
							{artist.name}
						</Badge>
					))}
					<Badge
						variant="secondary"
						className="bg-purple-500 dark:bg-purple-600 text-white"
					>
						{album.album_type}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className="pt-4">
				<div className="space-y-4">
					<div>
						<div className="flex items-center justify-between mb-1">
							<span className="text-sm font-medium dark:text-gray-200">
								Popularidad
							</span>
							<span className="text-sm font-medium dark:text-gray-200">
								{album.popularity}%
							</span>
						</div>
						<Progress value={album.popularity} className="h-2" />
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="flex items-center">
							<Calendar className="mr-2 h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" />
							<span className="text-sm dark:text-gray-200">
								{formatDate(album.release_date)}
							</span>
						</div>
						<div className="flex items-center">
							<Disc className="mr-2 h-4 w-4 text-purple-500 dark:text-purple-400 flex-shrink-0" />
							<span className="text-sm dark:text-gray-200">
								{album.total_tracks} pistas
							</span>
						</div>
						<div className="flex items-center">
							<Clock className="mr-2 h-4 w-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
							<span className="text-sm dark:text-gray-200">
								{formatDuration(totalDuration)}
							</span>
						</div>
						<div className="flex items-center">
							<Tag className="mr-2 h-4 w-4 text-yellow-500 dark:text-yellow-400 flex-shrink-0" />
							<span className="text-sm truncate dark:text-gray-200">
								{album.label}
							</span>
						</div>
					</div>

					<div>
						<h4 className="font-semibold mb-2 flex items-center dark:text-gray-200">
							<Music className="mr-2 h-4 w-4 text-red-500 dark:text-red-400" />
							Pistas
						</h4>
						<ul className="space-y-1">
							{album.tracks.items.slice(0, 3).map((track, index) => (
								<li key={track.id} className="text-sm dark:text-gray-300">
									{index + 1}. {track.name} -{" "}
									{formatDuration(track.duration_ms)}
								</li>
							))}
						</ul>
					</div>

					{album.external_urls.spotify && (
						<Link
							href={album.external_urls.spotify}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-full hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200"
						>
							<ExternalLink className="mr-2 h-4 w-4" />
							Ver en Spotify
						</Link>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
