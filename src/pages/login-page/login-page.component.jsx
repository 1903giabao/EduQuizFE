import LoginForm from "./login-form.component";

function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="
                w-full max-w-md
                bg-blue-900
                rounded-2xl
                shadow-xl
                shadow-black/40
                border border-white/10
                p-8
                transition-all
                duration-300
            ">
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;