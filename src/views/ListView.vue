<script>
import { useListStore } from '@/stores/list'
import { mapState, mapActions } from 'pinia'

// import component
import BaseInput from '@/components/BaseInput.vue'

const initialInput = {
  title: '',
  description: '',
  category: '',
  completed: false
}

export default {
  name: 'ListView',
  data: () => ({
    input: { ...initialInput },
    editing: false,
    // UI
    table: {
      columns: ['id', 'title', 'description', 'completed'],
      actions: [
        {
          title: 'Handle',
          event: 'handle-event'
        }
      ]
    }
  }),
  // declate component
  components: {
    BaseInput
  },
  computed: {
    // import all defined getters via mapState helper
    ...mapState(useListStore, ['getList', 'getDetail'])
  },
  async mounted() {
    await this.a$list()
  },
  methods: {
    // import all defined action via mapActions helper
    ...mapActions(useListStore, [
      'a$list',
      'a$add',
      'editIndex',
      'removeIndex'
    ]),
    // reset form
    resetForm() {
      // Reset Input with initial value
      Object.assign(this.input, initialInput)

      // reset editing state
      this.editing = false
    },
    // submit form
    addForm(event) {
      console.log(event)

      // pass input to action
      // determine
      if (this.editing === false) {
        this.a$add({ ...this.input })
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

    // handle event
    handleLogEvent(row) {
      console.log(row)
    }
  }
}
</script>

<template>
    <div>
      <h1>List</h1>
  
      <form @submit.prevent="addForm" method="post" @reset="resetForm">
        <base-input v-model="input.title" class="input" placeholder="Add new" required></base-input>
        <br />
        <base-input v-model="input.description" class="input" placeholder="Description" required></base-input>
        <br />
        <base-input v-model="input.category" class="input" placeholder="Category" required></base-input>
        <br />
        <input v-model="input.completed" type="checkbox" /> Completed
        <br />
        <div class="button-container">
          <button type="submit" :class="{ edit: editing !== false }">{{ editing !== false ? 'Edit' : 'Add' }}</button>
          <button type="reset">Cancel</button>
        </div>
      </form>
  
      <hr />
  
      <ol class="list">
        <template v-for="(item, index) in getList" :key="index">
          <li @dblclick="() => toggleCompleted(index)" :class="{ strike: item.completed }">
            <div class="list-item">
              <div class="buttons">
                <button class="red" @click="() => removeIndex(index)" :disabled="editing !== false">
                  &times;
                </button>
                <button class="orange" @click="() => detailList(index)" :disabled="editing !== false">
                  &#9998;
                </button>
              </div>
              <span>{{ item.title }}</span>
              <span v-if="item.description">- {{ item.description }}</span>
            </div>
          </li>
        </template>
      </ol>
  
      <hr />
  
    </div>
  </template>
  
  <style lang="scss" scoped>
  .list {
    margin-block: 0.5rem;
  }
  
  .strike {
    text-decoration: line-through;
  }
  
  .button-container {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  button {
    &.red {
      color: red;
    }
    &.orange {
      color: black;
    }
  }
  
  .list-item {
    display: flex;
    align-items: center;
  
    .buttons {
      margin-right: 10px;
      display: flex;
      gap: 5px;
    }
  }
    </style>
  