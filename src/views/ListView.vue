<script>
import { useListStore } from '@/stores/list'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'ListView',
  data: () => ({
    input: {
      name: ''
    }
  }),
  computed: {
    ...mapState(useListStore, ['getList'])
  },
  methods: {
    ...mapActions(useListStore, ['a$addList']),
    addList() {
      if (this.input.name && this.input.name.trim() !== '') {
        // Memanggil aksi a$addList dari store
        this.a$addList({ ...this.input })
        this.input.name = ''
      }
    },
    log() {
      console.log('Logging to Console')
    }
  }
}
</script>

<template>
  <div>
    <h1>List</h1>
    <input v-model="input.name" type="text" @keyup.enter="addList" />
    <button @click="log">Login</button>

    <ol>
      <template v-for="(item, index) in getList" :key="index">
        <li>{{ item.name }}</li>
      </template>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
input {
  height: 2rem;
}
button {
  height: 2rem;
}
div {
  display: grid;
}
</style>
