<script>
import { useListStore } from '@/stores/list'
import { mapState, mapActions } from 'pinia'

import BaseInput from '@/components/BaseInput.vue'

// Initial input for the form
const initialInput = {
  name: '',
  description: '',
  completed: false
}

export default {
  name: 'ListView',
  data: () => ({
    input: { ...initialInput },
    editing: false
  }),
  // declate component
  components: {
    BaseInput
  },

  computed: {
    // Import the getList state from the store
    ...mapState(useListStore, ['getList', 'getDetail'])
  },
  methods: {
    // Import the a$addList action from the store
    ...mapActions(useListStore, ['a$addList', 'a$editIndex', 'a$removeIndex']),
    // import all defined action via mapActions helper
    addList() {
      // Check if the name is not empty or only contains spaces
      if (this.input.name && this.input.name.trim() !== '') {
        this.a$addList({ ...this.input })

        this.input.name = ''
      }
    },

    // reset form
    resetForm() {
      // Reset Input with initial value
      Object.assign(this.input, initialInput)
      // reset editing state
      this.editing = false
    },

    //submit form
    addForm(event) {
      // Log the event to the console
      console.log(event)

      // pass input to action
      // determine
      if (this.editing === false) {
        this.addList({ ...this.input })
      } else {
        this.editIndex(this.editing, { ...this.input })
      }

      // call reset form
      this.resetForm()
    },
    detailList(index) {
      // set editing to true from index params
      this.editing = index
      // set input value from getters by index params
      this.input = { ...this.getDetail(index) }
    },
    // toggle completed
    toggleCompleted(index) {
      const detail = this.getDetail(index)
      this.editIndex(index, {
        // pass all entries in detail object
        ...detail,
        // take completed value then toggle it
        completed: !detail.completed
      })
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

    <form @submit.prevent="($event) => addForm($event)" method="post" @reset="() => resetForm()">
      <!-- use component using kebab-case -->
      <base-input v-model="input.name" class="input" placeholder="add new" required></base-input>
      <br />

      <!-- can be used many times -->
      <base-input v-model="input.description" class="input" placeholder="description" required>
      </base-input>
      <br />

      <!-- Checkbox for completed with v-model binding -->
      <input v-model="input.completed" type="checkbox" /> Completed
      <br />

      <button type="submit">{{ editing !== false ? 'Edit' : 'Add' }}</button>
      <button type="reset">Cancel</button>
    </form>

    <ol class="list">
      <template v-for="(item, index) in getList" :key="index">
        <li @dblclick="() => toggleCompleted(index)" :class="{ strike: item.completed }">
          <!-- trigger delete by index -->
          <button class="red" @click="() => removeIndex(index)" :disabled="editing !== false">
            &times;
          </button>
          <!-- trigger edit by index -->
          <button class="orange" @click="() => detailList(index)" :disabled="editing !== false">
            &#9998;
          </button>
          {{ item.name }}
          {{ item?.description ? `- ${item.description}` : '' }}
        </li>
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

button.red {
  color: red;
}
button.orange {
  color: orange;
}

.strike {
  text-decoration: line-through;
}
</style>
