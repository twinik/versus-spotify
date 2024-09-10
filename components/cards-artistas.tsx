"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Music, BarChart } from "lucide-react"
import Searcher from "@/components/searcher"
import { getArtist } from "@/services/spotify"
import { Artista } from "@/models/artista"

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
	const [artist1, setArtist1] = useState<Artista>()
	const [artist2, setArtist2] = useState<Artista>()

	useEffect(() => {
		const fetchData = async () => {
			const artist1 = await getArtist("13JJKrUewC1CJYmIDXQNoH")
			const artist2 = await getArtist("4kcQWQDK0u9AftVSpdrAgk")
			setArtist1(artist1)
			setArtist2(artist2)
		}
		fetchData()
	}, [])

	return (
		<>
			<Searcher
				searchTerm1={searchTerm1}
				setSearchTerm1={setSearchTerm1}
				searchTerm2={searchTerm2}
				setSearchTerm2={setSearchTerm2}
				placeholder="Buscar artista"
				service={getArtist}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card className="bg-white bg-opacity-50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
					<CardHeader>
						<CardTitle>{artist1?.name}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-center h-48 bg-gray-100 rounded-md overflow-hidden">
							<User className="h-24 w-24 text-gray-400" />
						</div>
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
						<div className="flex items-center justify-center h-48 bg-gray-100 rounded-md overflow-hidden">
							<User className="h-24 w-24 text-gray-400" />
						</div>
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
	)
}
