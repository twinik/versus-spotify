import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function AlbumCardSkeleton() {
	return (
		<Card className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
			<div className="relative">
				<div className="w-full h-64 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
				<div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
			</div>

			<CardHeader className="relative z-10 -mt-20 pb-0">
				<div className="h-8 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded mb-2 animate-pulse"></div>
				<div className="flex flex-wrap gap-2 mt-2">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="h-6 w-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse"
						></div>
					))}
				</div>
			</CardHeader>

			<CardContent className="pt-4">
				<div className="space-y-4">
					<div>
						<div className="flex items-center justify-between mb-1">
							<div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse"></div>
							<div className="h-4 w-10 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse"></div>
						</div>
						<div className="h-2 w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse"></div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						{[1, 2, 3, 4].map((i) => (
							<div key={i} className="flex items-center">
								<div className="h-4 w-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full mr-2 animate-pulse"></div>
								<div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse"></div>
							</div>
						))}
					</div>

					<div>
						<div className="h-5 w-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded mb-2 animate-pulse"></div>
						<div className="space-y-1">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse"
								></div>
							))}
						</div>
					</div>

					<div className="h-10 w-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full animate-pulse"></div>
				</div>
			</CardContent>
		</Card>
	);
}
