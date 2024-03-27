import { onRequest as __api_echo_ts_onRequest } from "/home/serdar/dev/my-astro-app/functions/api/echo.ts"
import { onRequest as __api___proxy___js_onRequest } from "/home/serdar/dev/my-astro-app/functions/api/[[proxy]].js"
import { onRequest as ____path___js_onRequest } from "/home/serdar/dev/my-astro-app/functions/[[path]].js"

export const routes = [
    {
      routePath: "/api/echo",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_echo_ts_onRequest],
    },
  {
      routePath: "/api/:proxy*",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api___proxy___js_onRequest],
    },
  {
      routePath: "/:path*",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [____path___js_onRequest],
    },
  ]