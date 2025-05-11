"use client";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    isAuthenticated && (
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        ログアウト
      </button>
    )
  );
};

export default LogoutButton;
