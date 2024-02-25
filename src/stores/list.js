import { defineStore } from 'pinia'

import * as s$todo from '@/services/todo'

export const useListStore = defineStore({
  id: 'list',
  state: () => ({
    list: []
  }),
  actions: {
    async a$list() {
      try {
        const { data } = await s$todo.list()
        this.list = data
      } catch ({ message, error }) {
        throw message ?? error
      }
    },
    async a$add(data) {
      try {
        await s$todo.add(data)
        await this.a$list()
      } catch ({ message, error }) {
        throw message ?? error
      }
    },
    async a$edit({ id, data }) {
      try {
        await s$todo.edit(id, data)
        await this.a$list()
      } catch ({ message, error }) {
        throw message ?? error
      }
    },
    async a$remove(id) {
      try {
        await s$todo.remove(id)
        await this.a$list()
      } catch ({ message, error }) {
        throw message ?? error
      }
    },
    removeIndex(index) {
      const id = this.list[index].id 
      this.a$remove(id)
    },
    editIndex(index, data) {
      const id = this.list[index].id 
      this.a$edit({ id, data })
    }
  },
  getters: {
    getList: ({ list }) => list,
    getDetail: ({ list }) => (index) => list[index]
  }
})