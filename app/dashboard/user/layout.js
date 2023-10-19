// app/dashboard/user/layout
import Link from "next/link"; 
 
export default function UserLayout({ children }) { 
  return ( 
    <> 
      <nav className="nav justify-content-center"> 
        <Link className="nav-link" href="/dashboard/user"> 
          Dashboard 
        </Link> 
      </nav> 
      {children} 
    </> 
  ); 
} 