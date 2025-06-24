import { useParams, Outlet } from "react-router";
import { NavLink } from "../components/NavLink";

export const ProjectsLayout = () => {
  const { pid } = useParams();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <nav>
        {pid && (
          <div style={{ display: "flex", gap: "1rem" }}>
            <NavLink to={`/projects`} text={`<- Back to Projects`} />
            {" | "}
            <NavLink to={`/projects/${pid}/edit`} text={`Edit Project`} />
          </div>
        )}
      </nav>
            <hr />

      <Outlet />
    </div>
  );
};
