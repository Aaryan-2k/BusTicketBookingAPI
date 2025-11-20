import RegisterForm from "../components/RegisterForm";
import NavBar from "../components/Nav"

export default function RegistrationPage() {
    return (
    <div class="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
            <NavBar />
            <RegisterForm />
        </div>
    );
}