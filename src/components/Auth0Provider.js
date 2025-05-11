"use client";

import { Auth0Provider } from "@auth0/auth0-react";

export default function Auth0ProviderComponent({ children }) {
  const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined" ? window.location.origin : "",
      }}
    >
      {children}
    </Auth0Provider>
  );
}
