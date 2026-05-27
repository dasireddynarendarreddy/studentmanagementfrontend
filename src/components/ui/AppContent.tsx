
import {useAuth} from "@/customhooks/useAuth"
export function AppContent() {
    const { user } = useAuth();
    return (
        <div>
            <h1>App Content</h1>
            <p>Welcome, {user.name}!</p>
        </div>
    )
}