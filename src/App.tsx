import { Routes, Route } from "react-router";
import "./App.css";
import { RootLayout } from "./RootLayout";
import { HomeLayout, Home } from "./home";
import { ProjectsLayout, Projects, ViewProject, EditProject } from "./projects";

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/projects">
          <Route index element={<Projects />} />
          <Route element={<ProjectsLayout />}>
            <Route path="/projects/:pid" element={<ViewProject />} />
            <Route path="/projects/:pid/edit" element={<EditProject />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
