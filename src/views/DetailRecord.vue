<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb">
          Расход
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card red">
            <div class="card-content white-text">
              <p>Описание:</p>
              <p>Сумма:</p>
              <p>Категория:</p>

              <small>12.12.12</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailRecord"
}
</script>

<style scoped>

</style>