import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Searcher({
	searchTerm1,
	setSearchTerm1,
	searchTerm2,
	setSearchTerm2,
	placeholder,
	service,
}: {
	searchTerm1: string
	setSearchTerm1: (value: string) => void
	searchTerm2: string
	setSearchTerm2: (value: string) => void
	placeholder: string
	service: (searchTerm: string) => Promise<unknown>
}) {
	const handleCompare = async () => {
		const artist1 = await service("13JJKrUewC1CJYmIDXQNoH") as { name: string }
		const artist2 = await service("4kcQWQDK0u9AftVSpdrAgk") as { name: string }
		alert(`${artist1.name} - ${artist2.name}`)
	}

	return (
		<div className="mt-5">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<div>
					<Input
						type="text"
						placeholder={placeholder}
						value={searchTerm1}
						onChange={(e) => setSearchTerm1(e.target.value)}
						className="bg-white bg-opacity-50 backdrop-blur-sm"
					/>
				</div>
				<div>
					<Input
						type="text"
						placeholder={placeholder + " para comparar"}
						value={searchTerm2}
						onChange={(e) => setSearchTerm2(e.target.value)}
						className="bg-white bg-opacity-50 backdrop-blur-sm"
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
	)
}
