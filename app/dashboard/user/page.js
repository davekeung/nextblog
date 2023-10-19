"use clinet"
import { cookies } from "next/headers"; 
import BlogList from "@/components/blogs/BlogList"; 
 
async function getLikedBlogs() { 
  const nextCookies = cookies(); 
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token"); 
 
  // console.log("nextAuthSessionToken", nextAuthSessionToken); 
 
  const apiUrl = `${process.env.API}/user/liked-blogs`; 
 
  const options = { 
    method: "GET", 
    // cache: "no-store", 
    next: { revalidate: 1 }, 
    headers: { 
      Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`, 
    }, 
  }; 
 
  try { 
    const response = await fetch(apiUrl, options); 
 
    if (!response.ok) { 
      throw new Error( 
        `Failed to fetch: ${response.status} ${response.statusText}` 
      ); 
    } 
 
    const data = await response.json(); 
    return data; 
  } catch (error) { 
    console.error(error); 
    return null; 
  } 
} 
 
export default async function UserDashboard() { 
  const likedBlogs = await getLikedBlogs(); 
 
  return ( 
    <div className="container"> 
      <div className="row"> 
        <div className="col"> 
          <p>Liked Blogs</p> 
          <br /> 
          <BlogList blogs={likedBlogs} /> 
        </div> 
      </div> 
    </div> 
  ); 
} 