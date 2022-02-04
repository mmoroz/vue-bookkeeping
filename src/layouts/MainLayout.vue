<template>
  <div class="app-main-layout">

    <main class="app-content">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <div class="fixed-action-btn">
      <a href="#" class="btn-floating btn-large blue">
        <i class="large material-icons">add</i>
      </a>
    </div>

  </div>
</template>

<script>
export default {
  name: "MainLayout"
}
</script>

<style scoped lang="scss">

</style>