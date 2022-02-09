<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div v-else class="row">

        <CategoryCreate @created="addNewCategory"/>

        <CategoryEdit v-if="categories.length" :key="categories.length + updateCount" :categories="categories" @updated="updateCategories"/>

      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
import Loader from "@/components/ui/Loader";
export default {
  name: "Categories",
  data:()=>({
    categories:[],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods:{
    addNewCategory(category){
      this.categories.push(category)
    },
    async updateCategories(categoryData){
      const idx = this.categories.findIndex(c => c.id === categoryData.id)
      this.categories[idx].title = categoryData.title
      this.categories[idx].limit = categoryData.limit
      this.updateCount ++
    }
  },
  components:{
    CategoryEdit,CategoryCreate
  }
}
</script>
