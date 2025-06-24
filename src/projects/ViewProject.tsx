import { useParams } from "react-router";

export const ViewProject = () => {
  const { pid } = useParams();

  return <h2>Project: {pid}</h2>;
};
