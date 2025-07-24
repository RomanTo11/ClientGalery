import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main>
    {children}
  </main>
);

export default AuthLayout;