import { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "../components/NavLink";

export const Projects = () => {
  const [pid, setPid] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (pid.trim()) {
            navigate(`/projects/${pid}`);
          }
        }}
      >
        <input
          type="text"
          placeholder="Enter Project ID"
          value={pid}
          onChange={(e) => setPid(e.target.value)}
          style={{ marginRight: "1rem" }}
        />

        <NavLink to={`/projects/${pid}`} text={`Go to Project ${pid}`} />
      </form>
    </div>
  );
};
