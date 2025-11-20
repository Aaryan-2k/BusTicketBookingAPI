import NavBar from "../components/Nav"
import LoginForm from "../components/LoginForm"
export default function LoginPage() {
  return (
    <div class="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <NavBar />
        <LoginForm />
    </div>
  )
}