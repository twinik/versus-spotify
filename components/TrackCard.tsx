/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
	Music,
	Clock,
	Disc,
	Mic,
	ExternalLink,
	AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { Track } from "@/models/Spotify";
import { TrackCardSkeleton } from "@/components/skeletons/TrackCardSkeleton";

interface TrackCardProps {
	track: Track | undefined;
	loading: boolean;
}

export function TrackCard({ track, loading }: TrackCardProps) {
	if (loading) return <TrackCardSkeleton />;
	if (!track) return null;

	const formatDuration = (ms: number) => {
		const minutes = Math.floor(ms / 60000);
		const seconds = ((ms % 60000) / 1000).toFixed(0);
		return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
	};

	return (
		<Card className="bg-white bg-opacity-80 backdrop-blur-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
			<div className="relative">
				{track.album.images[0]?.url ? (
					<img
						src={track.album.images[0].url}
						alt={track.album.name}
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
					{track.name}
				</CardTitle>
				<div className="flex flex-wrap gap-2 -mb-6">
					{track.artists.map((artist) => (
						<Badge
							key={artist.id}
							variant="secondary"
							className="bg-blue-500 text-white"
						>
							{artist.name}
						</Badge>
					))}
					{track.explicit && (
						<Badge variant="destructive" className="bg-red-500 text-white">
							<AlertTriangle className="w-3 h-3 mr-1" />
							Explícito
						</Badge>
					)}
				</div>
			</CardHeader>

			<CardContent className="pt-4">
				<div className="space-y-4">
					<div>
						<div className="flex items-center justify-between mb-1">
							<span className="text-sm font-medium">Popularidad</span>
							<span className="text-sm font-medium">{track.popularity}%</span>
						</div>
						<Progress value={track.popularity} className="h-2" />
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="flex items-center">
							<Disc className="mr-2 h-4 w-4 text-purple-500 flex-shrink-0" />
							<span className="text-sm truncate">{track.album.name}</span>
						</div>
						<div className="flex items-center">
							<Clock className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
							<span className="text-sm">
								{formatDuration(track.duration_ms)}
							</span>
						</div>
						<div className="flex items-center">
							<Mic className="mr-2 h-4 w-4 text-blue-500 flex-shrink-0" />
							<span className="text-sm truncate">{track.artists[0].name}</span>
						</div>
					</div>

					{track.preview_url && (
						<iframe
							title="Track Preview"
							src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
							width="100%"
							height="80"
							allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						/>
					)}

					{track.external_urls.spotify && (
						<Link
							href={track.external_urls.spotify}
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
