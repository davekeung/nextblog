// api/blog/[slug]/route
import { NextResponse } from "next/server"; 
import dbConnect from "@/utils/dbConnect"; 
import Blog from "@/models/blog"; 
 
export async function GET(req, context) { 
  await dbConnect(); 
  // console.log("req ==================> ", context); 
 
  try { 
    const blog = await Blog.findOne({ slug: context.params.slug 
}).populate( 
      "postedBy", 
      "name" 
    ); 
    return NextResponse.json(blog, { status: 200 }); 
  } catch (err) { 
    console.log(err); 
    return NextResponse.json( 
      { 
        err: "Server error. Please try again.", 
      }, 
      { status: 500 } 
    ); 
  } 
} 