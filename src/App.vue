<template>
  <div id="app">
    <notifications group="error"/>
    <transition name="scale" mode="out-in">
    <component :is="layout">
        <router-view/>
    </component>
    </transition>
  </div>
</template>

<script>
import EntryLayout from './layouts/EntryLayout';
import MainLayout from './layouts/MainLayout';

export default {
  name: "App",
  components: {
    EntryLayout,
    MainLayout,
  },
  computed:{
    layout(){
      console.log()
      return ( this.$route.meta.layout || 'entry' ) + '-layout'
    }
  },
};
</script>

<style lang="sass">
.form-buttons
  width: 100%
  display: flex
  justify-content: space-between

.scale-enter
  transform: scaleY(-1)
  opacity: 0

.scale-enter-active
  transition: all 0.5s ease

.scale-leave
  transform: scaleY(0)

.scale-leave-active
  transition: all 0.5s ease
  transform: scaleY(1)
  opacity: 0

</style>
