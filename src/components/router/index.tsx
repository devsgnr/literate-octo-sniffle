import { lazy, Suspense } from "react";
import { Redirect, Route } from "react-router";
import Loader from "../loader";

const AppRouter = () => {
  const App = lazy(
    () => import(/*webpackChunkName: "App" */ "../../pages/app")
  );
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Route path="/app" component={App} />
        <Redirect to="/app" />
      </Suspense>
    </div>
  );
};

export default AppRouter;
