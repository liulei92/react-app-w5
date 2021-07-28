import React, { Suspense } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { routerConfig } from "./router";

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={null}>
        <Switch>
          {routerConfig.map((config) => {
            const { hidden, ...route } = config;
            return !hidden && <Route key={route.path} {...route} />;
          })}
          <Route component={() => <Redirect to="/home" />}></Route>
        </Switch>
      </Suspense>
    </HashRouter>
  );
}
