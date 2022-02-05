<template>
  <div class="app-main-layout">

    <Navbar/>

    <Sidebar/>

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
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
export default {
  name: "MainLayout",
  components: {Navbar, Sidebar}
}
</script>

<style scoped lang="scss">

</style>