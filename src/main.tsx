import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ProSidebarProvider } from "react-pro-sidebar";

createRoot(document.getElementById("root")!).render(
  <ProSidebarProvider>
    <Provider store={store}>
      <Router />
    </Provider>
    </ProSidebarProvider>
  
);
