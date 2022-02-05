<template>
  <nav class="navbar blue darken-4">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#">
          <i class="material-icons">dehaze</i>
        </a>
        <span>12.12.12</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              class="dropdown-trigger"
              href="#"
              data-target="dropdown"
          >
            USER NAME
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <a href="#" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped lang="scss">
.navbar{
  color: #cfd8dc;
  a{
    color: #cfd8dc;
  }
}
</style>