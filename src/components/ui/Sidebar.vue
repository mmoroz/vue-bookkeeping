<template>

    <ul class="sidenav app-sidenav" :class="{open: isOp}">
      <li>
        <router-link exact to="/" class="waves-effect waves-orange pointer">Счет</router-link>
      </li>
      <li>
        <router-link to="/profile" class="waves-effect waves-orange pointer">Профиль</router-link>
      </li>
      <li>
        <router-link to="/history" class="waves-effect waves-orange pointer">История</router-link>
      </li>
      <li>
        <router-link to="/planning" class="waves-effect waves-orange pointer">Планирование</router-link>
      </li>
      <li>
        <router-link to="/record" class="waves-effect waves-orange pointer">Новая запись</router-link>
      </li>
      <li>
        <router-link to="/categories" class="waves-effect waves-orange pointer">Категории</router-link>
      </li>
    </ul>


</template>

<script>
export default {
  name: "Sidebar",
  props:['isOp']
}
</script>

<style scoped lang="scss">
.sidenav li>a.active{
  background-color: rgba(0,0,0,0.05);
}
</style>