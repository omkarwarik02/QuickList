import { useState, useCallback, useRef } from "react";
import { API_BASE_URL } from "../config/api";
import { getAuthToken } from "../utils/getAuthToken";

export type Listing = {
  _id: string;
  seller: string;
  photos: string[];
  title: string;
  category: string;
  price: number;
  phoneNumber: number;
  description: string;
  location: { name: string; latitude: number; longitude: number };
  status: "active" | "completed";
  createdAt: string;
}

const PAGE_SIZE = 20;

async function requestAllListings(page:number): Promise< {listings:Listing[]; hasMore:boolean}> {
    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/listings?page=${page}&limit=${PAGE_SIZE}`,{
      headers:{Authorization: `Bearer ${token}`},
    });
    if(!response.ok) throw new Error("Failed to fetch listings");

    const data = await response.json();
    return {listings:data.listings ?? [], hasMore:Boolean(data.hasMore)};
}

export function useAllListing(){
const [listings, setListing] = useState<Listing[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [loadingMore, setLoadingMore] = useState(false);
const [hasMore, setHasMore] = useState(true);

const pageRef = useRef(1);
const hasMoreRef = useRef(true);
const loadingMoreRef = useRef(false);


const fetch = useCallback(async () =>{
  setLoading(true);
  setError(null);
  try{
    const data = await requestAllListings(1);
    setListing(data.listings);
    setHasMore(data.hasMore);
    hasMoreRef.current = data.hasMore;
    pageRef.current = 1;

  } catch(error){
      console.error("Fetch all listings error:", error);
      setError("Failed to load listings")
  } finally{
    setLoading(false);
  }
},[])


const loadMore = useCallback(async()=>{
  if(loadingMoreRef.current || !hasMoreRef.current) return;
  loadingMoreRef.current = true;
  setLoadingMore(true);
  try{
    const nextPage = pageRef.current + 1;
    const data = await requestAllListings(nextPage);

    setListing((prev)=>{
      const seen = new Set(prev.map((l)=>l._id));
      return[...prev, ...data.listings.filter((l)=>!seen.has(l._id))]
    });
    setHasMore(data.hasMore);
    hasMoreRef.current = data.hasMore;
    pageRef.current = nextPage;
  }catch (error) {
    console.error("Load more listings error:", error);
  } finally {
    loadingMoreRef.current = false;
    setLoadingMore(false);
  }
},[])


return {  listings, loading, loadingMore, hasMore, error, fetch, loadMore};






















}