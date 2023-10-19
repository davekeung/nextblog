"use client"; 
import { useEffect } from "react"; 
 import BlogList from "@/components/blogs/BlogList"; 
import { useSearchParams } from "next/navigation"; 
import { useSearch } from "@/context/search"; 
 export default function SearchPage() { 
// context 
const { setSearchQuery, searchResults } = useSearch(); 
// console.log("searchQuery in search page =====> ", searchQuery); 
const searchParams = useSearchParams(); 
const query = searchParams.get("searchQuery"); 
// to fetch results on page load based on query 
  useEffect(() => { 
if (query) { 
console.log( 
"Got search params in search page => ", 
        searchParams.get("searchQuery") 
      ); 
      setSearchQuery(query); 
    } 
  }, [query]); 
  
return ( 
<div className="container"> 
<div className="row"> 
<div className="col"> 
<p>Search result {searchResults.length}</p> 
          {/* 
<pre>{JSON.stringify(searchResults, null, 4)}</pre> */} 
          {searchResults ? <BlogList blogs={searchResults} /> : ""} 
</div> 
</div> 
</div> 
  ); 
 } 