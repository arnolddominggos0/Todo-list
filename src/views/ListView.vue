<script>
import { useListStore } from '@/stores/list'
import { mapState, mapActions } from 'pinia'

import BaseInput from '@/components/BaseInput.vue'

// Initial input for the form
const initialInput = {
  name: '',
  completed: false
}

export default {
  name: 'ListView',
  data: () => ({
    input: { ...initialInput }
  }),
  // declate component
  components: {
    BaseInput
  },

  computed: {
    // Import the getList state from the store
    ...mapState(useListStore, ['getList'])
  },
  methods: {
    // Import the a$addList action from the store
    ...mapActions(useListStore, ['a$addList']),

    addList() {
      // Check if the name is not empty or only contains spaces
      if (this.input.name && this.input.name.trim() !== '') {
        this.a$addList({ ...this.input })

        this.input.name = ''
      }
    },

    addForm(event) {
      // Log the event to the console
      console.log(event)

      // Call the addList method to add a new list
      this.addList({ ...this.input })

      // Reset the input with initial values
      Object.assign(this.input, initialInput)
    },

    // Dummy method for logging to console
    log() {
      console.log('Logging to Console')
    }
  }
}
</script>

<template>
  <div>
    <h1>List</h1>

    <form @submit.prevent="($event) => addForm($event)" method="post">
      <!-- use component using kebab-case -->
      <base-input v-model="input.name" class="input" placeholder="add new"></base-input>
      <br />

      <!-- Checkbox for completed with v-model binding -->
      <input v-model="input.completed" type="checkbox" /> Completed
      <br />

      <button type="submit">Add</button>
    </form>

    <ol class="list">
      <template v-for="(item, index) in getList" :key="index">
        <li>{{ item.name }}</li>
      </template>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
input {
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  height: 2rem;
}

div {
  display: grid;
}

.list {
  margin-block: 0.5rem;
}
</style>
