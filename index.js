import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import SlackMessage from "SlackMessage";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <SlackMessage />
  </StrictMode>
);
