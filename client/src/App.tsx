import { useAuth } from "react-oidc-context";
import { SplashPage } from "./pages";
import ClientsTable from "./components/ClientTable";

const App = () => {
    const authData = useAuth();
    const { isAuthenticated, isLoading, signinRedirect, signoutSilent, user } = authData;

    if (isLoading) {
        return <SplashPage />
    }

    const { profile } = user || { };
    return (
        <main className="p-3">
            <h1 className="mb-3 text-5xl">Intelliflo React Auth Sample</h1>
            {!isAuthenticated && (
                <section className="p-5 rounded-box border border-base-content/5">
                    <p className="mb-3">You will need to sign in below to continue...</p>
                    <button type="button" className="btn btn-soft" onClick={() => signinRedirect()}>Sign In</button>
                </section>
            )}
            {isAuthenticated && (
                <section className="p-5 rounded-box border border-base-content/5">
                    <h1 className="text-3xl">Hello, {profile?.name}</h1>
                    <p>Here are your Intelliflo token details:</p>
                    <div className="my-3 p-3 border overflow-scroll">
                        {JSON.stringify(profile)}
                    </div>
                    <div>
                        <button type="button" className="btn btn-soft" onClick={() => signoutSilent()}>Sign Out</button>
                    </div>
                </section>
            )}
            {isAuthenticated && (
                <ClientsTable />
            )}
        </main>
    )
};

export default App;