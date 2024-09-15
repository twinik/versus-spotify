"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getSearch } from "@/services/spotify";

interface SearcherProps {
	typeSearch: string;
	placeholder: string;
	service: (searchTerm: string) => Promise<unknown>;
	setItem1: React.Dispatch<React.SetStateAction<unknown>>;
	setItem2: React.Dispatch<React.SetStateAction<unknown>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Searcher({
	typeSearch,
	placeholder,
	service,
	setItem1,
	setItem2,
	setLoading,
}: SearcherProps) {
	const [searchTerm1, setSearchTerm1] = useState("");
	const [searchTerm2, setSearchTerm2] = useState("");

	const handleCompare = async () => {
		if (searchTerm1 === "" || searchTerm2 === "") {
			toast.error("Ingrese un " + placeholder);
			return;
		}
		setLoading(true);
		const id1 = await getSearch(searchTerm1, typeSearch);
		const id2 = await getSearch(searchTerm2, typeSearch);
		if (id1 && id2) {
			const item1 = (await service(id1 as string)) as { name: string };
			const item2 = (await service(id2 as string)) as { name: string };
			setItem1(item1);
			setItem2(item2);
		} else {
			toast.error("No se encontraron resultados para la búsqueda.");
		}
		setLoading(false);
	};

	return (
		<div className="mt-5">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<div>
					<Input
						type="text"
						placeholder={"Buscar " + placeholder}
						value={searchTerm1}
						onChange={(e) => setSearchTerm1(e.target.value)}
						className="bg-white bg-opacity-50 backdrop-blur-sm text-black"
					/>
				</div>
				<div>
					<Input
						type="text"
						placeholder={"Buscar " + placeholder + " para comparar"}
						value={searchTerm2}
						onChange={(e) => setSearchTerm2(e.target.value)}
						className="bg-white bg-opacity-50 backdrop-blur-sm text-black"
					/>
				</div>
			</div>

			<Button
				onClick={handleCompare}
				className="w-full font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 hover:from-green-500 hover:to-blue-600 hover:shadow-lg hover:scale-95"
			>
				Comparar
			</Button>
		</div>
	);
}
