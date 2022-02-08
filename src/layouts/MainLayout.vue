<template>
  <div>
    <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>

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
  </div>

</template>

<script>
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import {getAuth, onAuthStateChanged} from "firebase/auth";
export default {
  name: "MainLayout",
  components: {Navbar, Sidebar},
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    const auth = getAuth();
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        if(!this.$store.getters.info.bill || !this.$store.getters.info.name) {
          await this.$store.dispatch('fetchInfo')
        }
        this.loading = false
      } else {
        await this.$store.dispatch('logout')
      }
    });
  },
  methods:{

  }
}
</script>

<style scoped lang="scss">

</style>