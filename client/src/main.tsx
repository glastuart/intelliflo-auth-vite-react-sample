import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from 'react-oidc-context'
import type { OidcClientSettings } from 'oidc-client-ts'

const oidc : OidcClientSettings = {
    authority: import.meta.env.VITE_IFLO_AUTHORITY,
    client_id: import.meta.env.VITE_IFLO_CLIENT_ID,
    redirect_uri: window.location.origin,
    scope: 'openid profile myprofile client_data'
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider 
            {...oidc} 
            onSigninCallback={() => {
                window.history.replaceState({}, document.title, window.location.pathname);
            }}
            onSignoutCallback={() => {
                window.history.replaceState({}, document.title, window.location.pathname);
            }}
        >
            <App />
        </AuthProvider>
    </StrictMode>,
);
