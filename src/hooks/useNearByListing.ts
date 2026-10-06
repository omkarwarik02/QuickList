import * as Location from "expo-location";
import { getAuth } from "firebase/auth";
import { useCallback, useState, useRef } from "react";
import { API_BASE_URL } from "../config/api";
import { Listing } from "./useAllListings";

const PAGE_SIZE = 20;

type NearbyQuery = { lat: number; lng: number; radiusKm: number };

async function requestNearbyPage(q: NearbyQuery, page: number) {
  const token = await getAuth().currentUser?.getIdToken();
  const res = await globalThis.fetch(
    `${API_BASE_URL}/listings/nearby?lat=${q.lat}&lng=${q.lng}&radius=${q.radiusKm}&page=${page}&limit=${PAGE_SIZE}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch nearby listings");

  const data = await res.json();
  return {
    listings: (data.listings ?? []) as Listing[],
    hasMore: Boolean(data.hasMore),
  };
}
export function useNearByListing() {
  const [listings, setListing] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const queryRef = useRef<NearbyQuery | null>(null);
  const pageRef = useRef(1);
  const hasMoreRef = useRef(false);
  const loadingMoreRef = useRef(false);
  // Bumped on every fetch so stale responses (overlapping fetches, or a loadMore from the previous query) are dropped
  const requestIdRef = useRef(0);







  const fetch = useCallback(async (radiusKm: number = 5) => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        if (requestId === requestIdRef.current) setError("Location permission denied");
        return false;
      }
      // A recent cached fix is instant; a fresh GPS fix can take several seconds
      const loc =
        (await Location.getLastKnownPositionAsync({ maxAge: 5 * 60 * 1000 })) ??
        (await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }));
      const token = await getAuth().currentUser?.getIdToken();

      globalThis
        .fetch(`${API_BASE_URL}/auth/location`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          }),
        })
        .catch((err) => console.error("Failed to update location:", err));

      const query: NearbyQuery = {
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
        radiusKm,
      };
      const data = await requestNearbyPage(query, 1);
      if (requestId !== requestIdRef.current) return false;
      queryRef.current = query;
      pageRef.current = 1;
      hasMoreRef.current = data.hasMore;
      setListing(data.listings);
      setHasMore(data.hasMore);
      return true;
    } catch (err) {
      if (requestId !== requestIdRef.current) return false;
      console.error("Fetch nearby listings error:", err);
      setError("Failed to fetch nearby listings");
      return false;
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, []);






const loadMore = useCallback(async()=>{
    if(loadingMoreRef.current || !hasMoreRef.current || !queryRef.current) return;

    const requestId = requestIdRef.current;
    loadingMoreRef.current = true;
    setLoadingMore(true);

    try{
         const nextPage = pageRef.current + 1;
           const data = await requestNearbyPage(queryRef.current, nextPage);
           // A new fetch started meanwhile; this page belongs to the old query
           if (requestId !== requestIdRef.current) return;

           setListing((prev) => {
      const seen = new Set(prev.map((l) => l._id));
      return [...prev, ...data.listings.filter((l) => !seen.has(l._id))];
    });

    pageRef.current = nextPage;
    hasMoreRef.current = data.hasMore;
    setHasMore(data.hasMore)



    }catch (err) {
    console.error("Load more nearby listings error:", err);
  } finally {
    loadingMoreRef.current = false;
    setLoadingMore(false);
  }
},[])








  return { listings, loading, loadingMore, hasMore, error, fetch, loadMore};
}
