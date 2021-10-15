<template>
    <div class="task"
    >
      <ul class="task__tags">
        <li v-for="tag in task.tags" :key="tag.name" :class="`${tag.name}`">
          {{ tag.title }}
        </li>
      </ul>
      <div class="task__header">
        <h6 class="task__title">{{ task.title }}</h6>
        <p class="task__date">{{ task.date | moment('MMM DD') }}</p>
      </div>
      <p class="task__description">{{ task.description }}</p>
      <ul class="task__list">
        <li class="task__list-item" v-for="link in task.links" :key="link.name">
          <img class="task__list-img" :src="require(`@/assets/images/${link.src}`)" alt="icon"/>
          <a class="task__list-link" target="_blank" :href="link.href">{{ link.title }}</a>
        </li>
      </ul>
      <ul class="task__owner">
        <li class="task__owner" v-for="owner in task.owners" :key="owner.id">
          <img class="task__owner-img"/>
          <span class="task__owner-name">{{ owner.name }} {{ owner.surname }}</span>
        </li>
      </ul>
      <hr :style="{ borderWidth: 1 + 'px', borderStyle: 'solid', borderColor: column.background }"/>
      <div class="task__buttons">
        <b-button class="btn-sm" variant="outline-success" @click="$emit('edit-task', task)"> <b-icon icon="card-text" aria-hidden="true"></b-icon> Edit</b-button>
        <b-button class="btn-sm" variant="outline-danger" @click="$emit('remove-task', column, task.id)"> <b-icon icon="trash-fill" aria-hidden="true"></b-icon> Delete</b-button>
      </div>
    </div>
</template>

<script>
import { Column, Task} from "../app/models/models";


export default {
  name: 'TaskComponent',
  props: {
    task: {
      type: Object,
      required: true,
    },
    column: {
      type: Object,
      required: true,
    },
  },
  methods:{
    removeTask(column, taskId){
      column.tasks = column.tasks.filter(task => task.id !== taskId)
    },
  }
};
</script>

<style lang="sass">
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
    max-width: 230px

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

  &__line
    border: 1px solid #1C5A7C


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
    margin-bottom: 12px

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

  .ios
    background: #000
  .android
    background: #17A24E
  .web
    background: #4765B0
  .desktop
    background: #CB9647
</style>
