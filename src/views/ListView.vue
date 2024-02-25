<script>
export default {
  data: () => ({
    input: {}
  }),

  methods: {
    log() {
      console.log(this.input)
    }
  }
}
</script>

<template>
  <div>
    <input type="text" v-model="input.title" />

    <button @click="log()">Log to Console</button>
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
