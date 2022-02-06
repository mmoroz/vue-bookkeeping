<template>
  <div class="app-main-layout">

    <Navbar @sidebarClose="isOpen = !isOpen"/>

    <Sidebar :isOp="isOpen"/>

    <main class="app-content" :class="{full:!isOpen}">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link to="/record" class="btn-floating btn-large blue">
        <i class="large material-icons">add</i>
      </router-link>
    </div>

  </div>
</template>

<script>
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
export default {
  name: "MainLayout",
  components: {Navbar, Sidebar},
  data: () => ({
    isOpen: true,
  }),
  methods:{

  }
}
</script>

<style scoped lang="scss">

</style>