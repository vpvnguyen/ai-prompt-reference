import { Outlet } from "react-router";
import { NavLink } from "./components/NavLink";

export const RootLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflow: "visible",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 9999,
          backgroundColor: "#fff",
          borderBottom: "1px solid #ddd",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>AI Prompts</h1>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <NavLink to="/" text={`Home`} />
          <NavLink to="/projects" text={`Projects`} />
        </nav>
      </header>
      <main
        style={{
          flex: 1,
          padding: "2rem",
          maxWidth: "1080px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};
