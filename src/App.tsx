import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRouter from "./components/router";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.scss";
import { LikeProviderContainer } from "./context/likes";

const App = () => {
  const query = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={query}>
      <LikeProviderContainer>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </LikeProviderContainer>
    </QueryClientProvider>
  );
};

export default App;
