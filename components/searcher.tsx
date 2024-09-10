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
			toast.error("Ingrese un " + placeholder);
			return;
		}
		setIdTerm1(await getSearch(searchTerm1, typeSearch));
		setIdTerm2(await getSearch(searchTerm2, typeSearch));
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
