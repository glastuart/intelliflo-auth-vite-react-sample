import { useAuth } from "react-oidc-context";
import { SplashPage } from "./pages";

const App = () => {
    const authData = useAuth();
    const { isAuthenticated, isLoading, signinRedirect, signoutSilent, user } = authData;

    if (isLoading) {
        return <SplashPage />
    }

    const { profile } = user || { };
    return (
        <main className="p-3">
            {!isAuthenticated && (
                <section>
                    <h1 className="mb-3 text-2xl">Intelliflo React Auth Sample</h1>
                    <button type="button" className="btn btn-soft" onClick={() => signinRedirect()}>Sign In</button>
                </section>
            )}
            {isAuthenticated && (
                <section>
                    <h1 className="mb-3 text-2xl">Hello, {profile?.name}</h1>
                    <div className="p-3 border overflow-scroll">
                        {JSON.stringify(profile)}
                    </div>
                    <div className="mt-3">
                        <button type="button" className="btn btn-soft" onClick={() => signoutSilent()}>Sign Out</button>
                    </div>
                </section>
            )}
        </main>
    )
};

export default App;