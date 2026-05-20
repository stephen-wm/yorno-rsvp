'use client';

import { useSyncExternalStore } from 'react';

const cleanup = () => {};
const subscribe = () => cleanup; // No cleanup needed - never subscribes

// Server snapshot (during SSR)
const getServerSnapshot = () => false;

// Client snapshot (after hydration)
const getClientSnapshot = () => true;

/**
 * A hook that returns true only on the client after hydration.
 * Uses `useSyncExternalStore` hook for optimal performance.
 */
export function useIsMounted() {
	return useSyncExternalStore(
		subscribe,
		getClientSnapshot, // Client value
		getServerSnapshot, // Server value
	);
}
