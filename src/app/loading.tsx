// This loading.tsx is the global fallback that wraps the entire app in a
// Suspense boundary. It renders instantly on navigation while the incoming
// route's Server Components fetch data on the server.
//
// Route-level loading.tsx files inside specific segments (e.g.
// app/(app)/[orgSlug]/projects/loading.tsx) will override this for their
// segment and should use more contextually appropriate skeletons.
// This global fallback is intentionally minimal.

export default function Loading() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="flex flex-col items-center gap-4">
				<div className="relative size-10">
					{/* Outer ring */}
					<div className="absolute inset-0 rounded-full border-2 border-muted" />
					{/* Spinning arc */}
					<div
						className="absolute inset-0 animate-spin rounded-full border-2
							border-transparent border-t-primary"
					/>
				</div>
				<p className="animate-pulse text-sm text-muted-foreground">
					Loading...
				</p>
			</div>
		</div>
	);
}
