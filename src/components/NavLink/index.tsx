import { useState } from "react";
import { NavLink as ReactRouterNavLink } from "react-router";

export const NavLink = ({
  to,
  text,
  ...props
}: {
  to: string;
  text: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <ReactRouterNavLink
      to={to}
      end
      style={({ isActive }) => ({
        textDecoration: "none",
        paddingBottom: "0.1rem",
        borderBottom: "1px solid transparent", // always reserve space
        color: hovered ? "#0056b3" : isActive ? "#007bff" : "#333",
        borderBottomColor: hovered
          ? "#0056b3"
          : isActive
          ? "#007bff"
          : "transparent",
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {text}
    </ReactRouterNavLink>
  );
};
