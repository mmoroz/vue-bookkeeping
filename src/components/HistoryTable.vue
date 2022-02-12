<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(r, idx) in records" :key="r.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ r.amount | currency('RUB') }}</td>
      <td>{{ r.date | date('datetime') }}</td>
      <td>{{ r.categoryName }}</td>
      <td>
        <span class="white-text badge" :class="r.typeClass">{{ r.typeText }}</span>
      </td>
      <td>
        <button class="btn-small btn" @click="$router.push('/detail/'+r.id)">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "HistoryTable",
  props: ['records','categories'],

}
</script>

<style scoped lang="scss">
.badge{
  padding-bottom: 3px;
  border-radius: 3px;
  font-size: 12px;
}
</style>