import mongoose from 'mongoose'
import { z } from 'zod'
import { publicProcedure } from '../trpc'

export interface ITodo {
  _id: string
  text: string
  done: boolean
}

const todoSchema = new mongoose.Schema<ITodo>({
  text: String,
  done: Boolean,
})

const TodoModel = mongoose.model('Todo', todoSchema)

export const TodoRouters = {
  todoList: publicProcedure
    .input(z.object({}))
    .query<ITodo[]>(async () => {
      const list = await TodoModel.find()
      return list
    }),

  todoCreate: publicProcedure
    .input(z.object({
      text: z.string(),
    }))
    .mutation(async ({ input }) => {
      const todo = new TodoModel({
        text: input.text,
        done: false,
      })
      await todo.save()
      return todo
    }),

  todoUpdate: publicProcedure
    .input(z.object({
      _id: z.string(),
      text: z.string(),
      done: z.boolean(),
    }))
    .mutation(async ({ input }) => {
      const { _id, ...rest } = input
      const todo = await TodoModel.findById(_id)
      if (!todo)
        throw new Error('todo not found')

      Object.assign(todo, rest)
      await todo.save()
      return todo
    }),

  todoDelete: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ input }) => {
      const { id } = input
      await TodoModel.deleteOne({ _id: id })
      return 'ok'
    }),

}
