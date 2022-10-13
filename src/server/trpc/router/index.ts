// src/server/router/index.ts
import { router } from "../trpc";

import { exampleRouter } from "./example";
import { taskRouter } from "./task";

export const appRouter = router({
  example: exampleRouter,
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
