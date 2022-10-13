import { publicProcedure, router } from "../trpc";
import { z } from "zod";

type Task = {
  id: number;
  title: string;
  status: 'todo' | 'done';
}

const db ={
  tasks: new Map<number, Task>([[1, {id: 1, title: 'task 1', status: 'todo'}]])
}

export const taskRouter = router({
  create: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input, ctx }) => {
        db.tasks.set(db.tasks.size + 1, { id: db.tasks.size + 1, title: input.text, status: 'todo' })
        return db.tasks.values()
      }
    ),
  completeTask: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input, ctx }) => {
      db.tasks.set(input.id, { ...db.tasks.get(input.id)!, status: 'done' });
      return db.tasks.get(input.id);
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return Array.from(db.tasks.values());
  }),
});
