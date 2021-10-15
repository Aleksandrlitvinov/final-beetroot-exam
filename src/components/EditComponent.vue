<template>
  <div>
    <b-modal
        :visible="null !== task"
        v-if="null !== task"
        @hidden="$emit('hidden')"
        hide-header
    >
      <form>
        <div class="task__tags">
          <button @click="task.toggleTag(tag)" v-for="tag in tags" type="button" :class="`${task.tags.includes(tag) ? 'transparent' : ''} ${tag.name}`">{{ tag.title }}</button>
        </div>
        <div class="form-group">
          <input class="form-control" type="text" placeholder="Task title" v-model="task.title">
        </div>
        <div class="form-group">
          <textarea class="form-control" type="text" v-model="task.description"></textarea>
        </div>
        <div class="form-group">
          <input class="form-control" type="text" placeholder="Document Link" v-model="task.links[0].href">
        </div>
        <div class="form-group">
          <input class="form-control" type="text" placeholder="Link to design" v-model="task.links[1].href">
        </div>
        <div class="form-group">
          <input class="form-control" type="text" placeholder="Project Link" v-model="task.links[2].href">
        </div>
        <div class="form__footer">
        <b-dropdown size="sm" class="input-group-append" text="Owners">
          <b-dropdown-item class="dropdown-item" v-for="owner in board.owners" :key="owner.id" @click="task.addOwner(owner)">
            {{ owner.name}}
            {{ owner.surname}}
          </b-dropdown-item>
        </b-dropdown>
        <div class="btn-group btn-group-sm">
          <b type="button" class="btn btn-warning task__owner" v-for="owner in task.owners" :key="owner.id" @click="task.removeOwner(owner)" >
            {{owner.name}}
          </b>
        </div>
        <b-button class="form__footer-btn btn-success" @click.prevent="saveChanges">Save</b-button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { Board, Task } from "../app/models/models";


export default {
  name: 'EditComponent',
  props:{
    board:{
      type: Object,
      required: true,
    },
    task:{
      type: Object,
      required: false,
    },
  },
  computed:{
    tags(){
      return[
        {
          name:'ios', title:'iOS'
        },
        {
          name:'android', title: 'Android'
        },
        {
          name: 'web', title: 'Web'
        },
        {
          name: 'desktop', title: 'Desktop'
        }
      ]
    }
  },
  methods:{
    saveChanges(){
      localStorage.board = JSON.stringify(this.board)
    },
    addOwner(owner){
      if (!this.owners.includes(owner)){
        this.owners.push(owner)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.md-dialog /deep/.md-dialog-container
  width: 768px
  max-height: 100%

.modal
  max-height: 100%

.form__footer
  display: flex
  justify-content: space-around
  align-items: center
  &-btn
    line-height: 1

.task__owner
  margin: 10px

</style>