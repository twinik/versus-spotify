"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Disc, Music, User } from "lucide-react"
import CardsArtistas from "@/components/cards-artistas"
import CardsCanciones from "@/components/cards-canciones"
import CardsAlbumes from "@/components/cards-albumes"

export default function Home() {
	const [searchTerm1, setSearchTerm1] = useState("")
	const [searchTerm2, setSearchTerm2] = useState("")

	return (
		<div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 p-4 md:p-8">
			<header className="mb-8 text-center">
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
							searchTerm1={searchTerm1}
							setSearchTerm1={setSearchTerm1}
							searchTerm2={searchTerm2}
							setSearchTerm2={setSearchTerm2}
						/>
					</TabsContent>
					<TabsContent value="songs">
						<CardsCanciones
							searchTerm1={searchTerm1}
							setSearchTerm1={setSearchTerm1}
							searchTerm2={searchTerm2}
							setSearchTerm2={setSearchTerm2}
						/>
					</TabsContent>
					<TabsContent value="albums">
						<CardsAlbumes
							searchTerm1={searchTerm1}
							setSearchTerm1={setSearchTerm1}
							searchTerm2={searchTerm2}
							setSearchTerm2={setSearchTerm2}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
