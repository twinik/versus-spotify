import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Music, BarChart } from "lucide-react"
import Searcher from "@/components/searcher"
import { getAlbum } from "@/services/spotify"

export default function CardArtistas({
	searchTerm1,
	setSearchTerm1,
	searchTerm2,
	setSearchTerm2,
}: {
	searchTerm1: string
	setSearchTerm1: (value: string) => void
	searchTerm2: string
	setSearchTerm2: (value: string) => void
}) {
	return (
		<>
			<Searcher
				searchTerm1={searchTerm1}
				setSearchTerm1={setSearchTerm1}
				searchTerm2={searchTerm2}
				setSearchTerm2={setSearchTerm2}
				placeholder="Buscar álbum"
				service={getAlbum}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card className="bg-white bg-opacity-50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
					<CardHeader>
						<CardTitle>Album 1</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-center h-48 bg-gray-100 rounded-md overflow-hidden">
							<User className="h-24 w-24 text-gray-400" />
						</div>
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
						<CardTitle>Album 2</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-center h-48 bg-gray-100 rounded-md overflow-hidden">
							<User className="h-24 w-24 text-gray-400" />
						</div>
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
	)
}
