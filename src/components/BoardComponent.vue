<template>
  <div class="board">
    <div class="header">
      <div class="header__group">
      <h3 class="header__title">Kanban Board</h3>
      <b-dropdown size="sm" class="input-group-append" text="Owners">
        <b-dropdown-item
            @click="editTask.addOwner(owner)"
            class="dropdown-item"
            v-for="owner in board.owners"
            :key="owner.id"
            disabled
        >
          <b-icon icon="person-fill"></b-icon>
           <span class="full-name">{{ owner.name}} {{ owner.surname}}</span>
        </b-dropdown-item>
        <b-dropdown-item>
          <button
              class="btn btn-primary btn-sm btn-block mt-2 btn-add"
              @click="$emit('show-add-owner-form')"
          >
            <b-icon icon="person-fill"></b-icon> Add new owner</button>
        </b-dropdown-item>
      </b-dropdown>
      </div>
      <div class="header__logout">
      <b-button size="sm" variant="outline-primary" @click="logout">
        <b-icon class="header__logout-icon" icon="power" aria-hidden="true"></b-icon> Logout
      </b-button>
      </div>
    </div>
      <div class="board__columns">
          <div
            class="board__columns-item"
            v-for="column in board.columns"
            :key="column.id"
            @end="onEnd"
          >
            <div
              class="board__columns-item-header"
              :style="{ background: column.background }"
            >
            <p class="board__columns-item-title">{{ column.title }}</p>
            </div>
              <draggable :list="column.tasks" group="tasks">
                <TaskComponent
                    v-for="task in column.tasks"
                    :key="task.id"
                    :task="task"
                    :column = "column"
                    @edit-task = "editTask = $event"
                    @remove-task = "removeTask"
                />
              </draggable>
            <button class="board__columns-item-button" @click="createTask(column)">
              +
            </button>

        </div>
        <EditComponent
            :task="editTask"
            :board="board"
            @hidden="editTask = null"
        />
      </div>
  </div>
</template>

<script>
import {Board, Task, Owner} from "../app/models/models";
import TaskComponent from "./TaskComponent";
import EditComponent from "./EditComponent";
import draggable from 'vuedraggable';


export default {
  name: "BoardComponent",
  props:{
    board: {
      type: Object,
      required: true,
    },
    idGenerate:{
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      newTask: null,
      editTask: null,
      editOwner: null,
    }
  },
  components: {
    TaskComponent,
    EditComponent,
    draggable,
  },
  methods:{
    onEnd(){
      localStorage.board = JSON.stringify(this.board)
    },
    createTask(column){
      column.tasks.push(new Task({id:this.idGenerate(), tags:[], title:'New task', description:'Description', links:[{name: "doc", title: "Document Link →", src: "doc-logo.png", href: ""}, {name: "design", title: "Link to design →", src: "figma-logo.png", href: ""},{name: "project", title: "Project Link →", src: "project-logo.png", href: "", owners:[]}]}))
      localStorage.board = JSON.stringify(this.board)
    },
    showAddOwnerForm(){
      this.editOwner = new Owner();
    },
    removeTask(column, taskId){
      if (!confirm("Are you sure?")) {
        return;
      }
      column.tasks = column.tasks.filter(task => task.id !== taskId)
      localStorage.board = JSON.stringify(this.board)
    },
    async logout(){
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  },
};
</script>

<style lang="sass">
.header
  display: flex
  width: 95%
  align-items: center
  justify-content: space-between
  margin-left: auto
  margin-right: auto
  padding-bottom: 40px

  &__group
    display: flex

  &__title
    font-family: 'SF-Pro-Display-Bold', sans-serif
    font-style: normal
    font-weight: bold
    font-size: 28px
    line-height: 33px
    color: #2B3744
    margin-right: 20px

  &__logout
    align-self: flex-end

.board
  padding: 40px 50px 50px 50px
  background: #FFFFFF
  border-radius: 20px

  &__columns
    display: flex
    align-items: flex-start

    &-item
      max-width: 345px
      width: 100%
      background: #F8F8F9
      margin: 1rem
      border-radius: 6px

      &-header
        padding: 9px
        border-radius: 6px 6px 0 0
        margin-bottom: 16px

      &-title
        font-family: 'SF-Pro-Text-Bold', sans-serif
        font-size: 14px
        line-height: 17px
        text-align: center
        color: #FFFFFF
        margin-bottom: 0
      &-button
        display: block
        font-family: 'SF-Pro-Text-Bold', sans-serif
        font-size: 16px
        line-height: 19px
        margin-bottom: 16px
        max-width: 325px
        text-align: left
        background: #FFFFFF
        width: 100%
        margin-left: auto
        margin-right: auto
        border: 1px solid #F0F0F0
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05)
        border-radius: 6px
        padding: 16px
        cursor: pointer
      &-empty
        font-family: 'SF-Pro-Text-Regular', sans-serif
        text-align: center
        color: #6E6D6D
        margin-bottom: 12px
.task
  padding: 16px
  max-width: 325px
  background: #FFFFFF
  width: 100%
  margin-bottom: 10px
  margin-left: auto
  margin-right: auto
  border-radius: 6px
  border: 1px solid #F0F0F0
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05)
  cursor: pointer

  &__header
    display: flex
    justify-content: space-between

  &__tags
    display: flex
    list-style: none
    font-family: 'SF-Pro-Text-Regular', sans-serif
    font-weight: normal
    font-size: 14px
    line-height: 17px
    margin-bottom: 12px
    padding-left: 0

  &__title
    font-family: 'SF-Pro-Text-Regular', sans-serif
    font-style: normal
    font-weight: 500
    font-size: 16px
    line-height: 19px
    color: #000000
    margin-bottom: 8px
    max-width: 195px
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap

  &__date
    font-family: 'SF-Pro-Text-Regular', sans-serif
    font-style: normal
    font-weight: normal
    font-size: 13px
    line-height: 16px
    text-align: right
    color: #2B3744
    mix-blend-mode: normal
    opacity: 0.6

  &__description
    font-family: 'SF-Pro-Text-Regular', sans-serif
    font-style: normal
    font-weight: normal
    font-size: 13px
    line-height: 16px
    color: #80878F
    margin-bottom: 12px
    max-width: 200px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis


  &__list
    padding-left: 0
    list-style: none

    &-item
      font-family: 'SF-Pro-Text-Regular', sans-serif
      font-style: normal
      font-weight: normal
      font-size: 13px
      line-height: 16px
      text-decoration-line: underline
      margin-bottom: 12px

    &-img
      margin-right: 5px

    &-link
      color: #80878F !important

  &__owner
    font-family: 'SF-Pro-Text-Regular', sans-serif
    font-style: normal
    font-weight: normal
    font-size: 13px
    line-height: 16px
    color: #80878F
    padding-left: 0
    list-style: none

    &-img
      margin-right: 5px

  &__buttons
    display: flex
    justify-content: space-between

.ios,
.android,
.web,
.desktop
  padding: 5px
  color: #fff
  border-radius: 4px
  margin-right: 10px
  border: none

.ios
  background: #000
.android
  background: #17A24E
.web
  background: #4765B0
.desktop
  background: #CB9647

.form-control
  margin-bottom: 10px

.transparent
  background: transparent
  color: #000
  border: 1px solid #111

.full-name
  margin-left: 5px

.btn-add
  width: 100%

@media (max-width: 1400px)
  .board__columns
    flex-wrap: wrap
    justify-content: center

@media (max-width: 1024px)
  .board
    padding: 30px 15px

@media (max-width: 485px)
  .board
    padding: 30px 15px
  .header
    position: relative
    padding-bottom: 10px
    &__title
      width: 100%
      margin-bottom: 10px
    &__group
      flex-wrap: wrap
    &__logout
      position: absolute
      right: 0
      top: 0
</style>