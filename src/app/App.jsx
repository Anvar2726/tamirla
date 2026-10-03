// import { useEffect } from "react";
// import { RouterProvider } from "react-router-dom";
// // import { router } from "@/app/router/router";
// import { router } from "@/app/router/router";
// import { useThemeStore } from "@/features/theme-toggle/model/useThemeStore";

// export default function App() {
//   const theme = useThemeStore((state) => state.theme);

//   useEffect(() => {
//     document.documentElement.dataset.theme = theme;
//   }, [theme]);

//   return <RouterProvider router={router} />;
// }

import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router/router";
import { useThemeStore } from "@/features/theme-toggle/model/useThemeStore";
// import ErrorBoundary from "./ErrorBoundary";

export default function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
      <RouterProvider router={router} />
  );
}
