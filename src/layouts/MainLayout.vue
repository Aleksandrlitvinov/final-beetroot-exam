<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'main-layout',
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length){
      await this.$store.dispatch('fetchInfo')
    }
  },
}
</script>