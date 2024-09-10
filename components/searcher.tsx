"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSearchArtist, getSearchTrack, getSearchAlbum } from "@/services/spotify";

interface SearcherProps {
	typeSearch: string;
	placeholder: string;
	service: (searchTerm: string) => Promise<unknown>;
	setItem1: React.Dispatch<React.SetStateAction<unknown>>;
	setItem2: React.Dispatch<React.SetStateAction<unknown>>;
}

export default function Searcher({
	typeSearch,
	placeholder,
	service,
	setItem1,
	setItem2,
}: SearcherProps) {
	const [searchTerm1, setSearchTerm1] = useState("");
	const [searchTerm2, setSearchTerm2] = useState("");
	const [idTerm1, setIdTerm1] = useState<string | null>(null);
	const [idTerm2, setIdTerm2] = useState<string | null>(null);

	const handleCompare = async () => {
		if (searchTerm1 === "" || searchTerm2 === "") {
			alert("No se puede buscar un artista o cancion vacio");
			return;
		}
		if (typeSearch === "artist") {
			setIdTerm1(await getSearchArtist(searchTerm1));
			setIdTerm2(await getSearchArtist(searchTerm2));
		} else if (typeSearch === "track") {
			setIdTerm1(await getSearchTrack(searchTerm1));
			setIdTerm2(await getSearchTrack(searchTerm2));
		} else if (typeSearch === "album") {
			setIdTerm1(await getSearchAlbum(searchTerm1));
			setIdTerm2(await getSearchAlbum(searchTerm2));
		}
		const item1 = (await service(idTerm1 as string)) as { name: string };
		const item2 = (await service(idTerm2 as string)) as { name: string };
		setItem1(item1);
		setItem2(item2);
	};

	return (
		<div className="mt-5">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<div>
					<Input
						type="text"
						placeholder={placeholder}
						value={searchTerm1}
						onChange={(e) => setSearchTerm1(e.target.value)}
						className="bg-white bg-opacity-50 backdrop-blur-sm text-black"
					/>
				</div>
				<div>
					<Input
						type="text"
						placeholder={placeholder + " para comparar"}
						value={searchTerm2}
						onChange={(e) => setSearchTerm2(e.target.value)}
						className="bg-white bg-opacity-50 backdrop-blur-sm text-black"
					/>
				</div>
			</div>

			<Button
				onClick={handleCompare}
				className="w-full mb-8 bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 hover:from-green-500 hover:to-blue-600 hover:shadow-lg hover:scale-95"
			>
				Comparar
			</Button>
		</div>
	);
}
