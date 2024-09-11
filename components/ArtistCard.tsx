/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, Music, BarChart, Disc, Mic, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Artist } from "@/models/Spotify";
import { ArtistCardSkeleton } from "@/components/skeletons/ArtistCardSkeleton";

interface ArtistCardProps {
	artist: Artist | undefined;
	loading: boolean;
}

export function ArtistCard({ artist, loading }: ArtistCardProps) {
	if (loading) return <ArtistCardSkeleton />;
	if (!artist) return null;

	return (
		<Card className="bg-white bg-opacity-70 backdrop-blur-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
			<div className="relative">
				{artist.images[0]?.url ? (
					<img
						src={artist.images[0].url}
						alt={artist.name}
						className="w-full h-64 object-cover"
					/>
				) : (
					<div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
						<User className="h-24 w-24 text-gray-400 dark:text-gray-500" />
					</div>
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
			</div>

			<CardHeader className="relative z-10 -mt-20 pb-0">
				<CardTitle className="text-3xl font-bold text-white">
					{artist.name}
				</CardTitle>
				<div className="flex flex-wrap gap-2 mt-2">
					{artist.genres.slice(0, 3).map((genre) => (
						<Badge
							key={genre}
							variant="secondary"
							className="bg-blue-500 text-white"
						>
							{genre}
						</Badge>
					))}
				</div>
			</CardHeader>

			<CardContent className="pt-4">
				<div className="space-y-4">
					<div>
						<div className="flex items-center justify-between mb-1">
							<span className="text-sm font-medium">Popularidad</span>
							<span className="text-sm font-medium">{artist.popularity}%</span>
						</div>
						<Progress value={artist.popularity} className="h-2" />
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="flex items-center">
							<BarChart className="mr-2 h-4 w-4 text-blue-500" />
							<span className="text-sm">
								{artist.followers.total.toLocaleString()} seguidores
							</span>
						</div>
						<div className="flex items-center">
							<Mic className="mr-2 h-4 w-4 text-green-500" />
							<span className="text-sm">
								{/* {artist.totalTracksCount} */} 10 canciones
							</span>
						</div>
						<div className="flex items-center">
							<Disc className="mr-2 h-4 w-4 text-purple-500" />
							<span className="text-sm">{artist.totalAlbums} álbumes</span>
						</div>
					</div>

					<div>
						<h4 className="font-semibold mb-2 flex items-center">
							<Music className="mr-2 h-4 w-4 text-red-500" />
							Top 3 canciones
						</h4>
						<ul className="space-y-1">
							{artist.topTracks.slice(0, 3).map((track, index) => (
								<li key={track.id} className="text-sm">
									{index + 1}. {track.name}
								</li>
							))}
						</ul>
					</div>

					{artist.external_urls.spotify && (
						<Link
							href={artist.external_urls.spotify}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200"
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
