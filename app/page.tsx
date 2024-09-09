"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Disc, Music, User } from "lucide-react"

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
						<h2 className="text-2xl text-black font-semibold mb-4">
							Compara Artistas
						</h2>
					</TabsContent>
					<TabsContent value="songs">
						<h2 className="text-2xl font-semibold mb-4">Compara Canciones</h2>
					</TabsContent>
					<TabsContent value="albums">
						<h2 className="text-2xl font-semibold mb-4">Compara Álbumes</h2>
					</TabsContent>
				</Tabs>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
					<div>
						<Input
							type="text"
							placeholder="Buscar artista, canción o álbum"
							value={searchTerm1}
							onChange={(e) => setSearchTerm1(e.target.value)}
							className="bg-white bg-opacity-50 backdrop-blur-sm"
						/>
					</div>
					<div>
						<Input
							type="text"
							placeholder="Buscar artista, canción o álbum para comparar"
							value={searchTerm2}
							onChange={(e) => setSearchTerm2(e.target.value)}
							className="bg-white bg-opacity-50 backdrop-blur-sm"
						/>
					</div>
				</div>

				<Button className="w-full mb-8 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transition-all duration-300">
					Comparar
				</Button>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card className="bg-white bg-opacity-50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
						<CardHeader>
							<CardTitle>Artista 1</CardTitle>
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
							<CardTitle>Artista 2</CardTitle>
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
			</div>
		</div>
	)
}
