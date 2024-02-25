<script>
import { useListStore } from '@/stores/list'
import { mapState, mapActions } from 'pinia'

// Initial input for the form
const initialInput = {
  name: '',
  completed: false
}

export default {
  name: 'ListView',
  data: () => ({
    // Use the spread operator to create a copy of initialInput
    input: { ...initialInput }
  }),
  computed: {
    // Import the getList state from the store
    ...mapState(useListStore, ['getList'])
  },
  methods: {
    // Import the a$addList action from the store
    ...mapActions(useListStore, ['a$addList']),

    // Method to add a new list
    addList() {
      // Check if the name is not empty or only contains spaces
      if (this.input.name && this.input.name.trim() !== '') {
        // Call the a$addList action from the store
        this.a$addList({ ...this.input })

        // Reset the name field to an empty string
        this.input.name = ''
      }
    },

    // Method to handle form submission
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
    
    <!-- Form element with a submit event listener -->
    <form @submit.prevent="($event) => addForm($event)" method="post">
      <!-- Input field for the name with v-model binding -->
      <input class="input" v-model="input.name" type="text" placeholder="add new list" />
      <br />

      <!-- Checkbox for completed with v-model binding -->
      <input v-model="input.completed" type="checkbox" name="completed" id="completed" />
      Completed
      <br />

      <!-- Button to submit the form -->
      <button type="submit">Add</button>
    </form>

    <!-- Ordered list to display the lists -->
    <ol class="list">
      <!-- Loop through the lists and display each item in a list item -->
      <template v-for="(item, index) in getList" :key="index">
        <li>{{ item.name }}</li>
      </template>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
/* Styling for input fields */
input {
  padding: 0.5rem;
  font-size: 1rem;
}

/* Styling for buttons */
button {
  height: 2rem;
}

/* Styling for the container div */
div {
  display: grid;
}

/* Styling for the list */
.list {
  margin-block: 0.5rem;
}
</style>
