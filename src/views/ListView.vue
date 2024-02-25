<script>
export default {
  data: () => ({
    input: {}
  }),

  methods: {
    addList() {
      if (this.input.name && this.input.name.trim() !== '') {
        this.list.push({ ...this.input })
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
    <input v-model="input.name" type="text" @keyup.enter="addList" />

    <button @click="log">Log to Console</button>
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
