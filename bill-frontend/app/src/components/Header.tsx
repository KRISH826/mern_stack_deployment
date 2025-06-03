import { logOut } from "@/redux/auth/authSlice"
import { Button } from "./ui/button"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { LogOut } from "lucide-react"
import { Link } from "react-router-dom"


const Header = () => {
    const dispatch = useDispatch<AppDispatch>()
    const handleLogout = () => {
        dispatch(logOut())
    }
    return (
        <header className="bg-white shadow-lg text-white px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-20">
                <div className="text-2xl text-slate-900 font-bold">My Application</div>
                <nav>
                    <ul className="flex gap-2">
                        <li>
                            <Link to="/" className="text-yellow-600 px-3 py-2 rounded-md bg-yellow-50 font-bold">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/bills" className="text-yellow-600 px-3 py-2 rounded-md font-bold hover:bg-yellow-50 transition">Generate Bills</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Button onClick={handleLogout}><LogOut size={18} color="white" className="mr-1" />Logout</Button>
        </header>
    )
}

export default Header