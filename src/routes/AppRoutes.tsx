import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";

export const AppRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, pageElement: PageElement }) => (
        <Route key={path} path={path} element={<PageElement />} />
      ))}

      <Route index element={<Navigate to="/color-dropper" replace />} />
    </Routes>
  );
};
