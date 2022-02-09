<template>
  <div class="col s12 m6">
    <div v-if="categories.length">
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">

        <div class="input-field" >
          <select ref="select" v-model="current">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id"> {{ cat.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model.trim="title"
              :class="{invalid: ($v.title.$dirty && !$v.title.required)}"
          >
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="$v.title.$dirty && !$v.title.required">Введите название</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: ($v.limit.$dirty && !$v.limit.minValue) || ($v.limit.$dirty && !$v.limit.required)}"
          >
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.minValue">Минимальная величина {{ $v.limit.$params.minValue.min }}</span>
          <span class="helper-text invalid" v-if="$v.limit.$dirty && !$v.limit.required">Введите лимит</span>
        </div>

        <button class="waves-effect waves-light btn blue-grey darken-3" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
export default {
  name: "CategoryEdit",
  props:['categories'],
  emits:['updated'],
  data:()=>({
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  watch:{
    current(catId){
      const {title, limit} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    if(this.categories.length > 0) {
      const {title, id, limit} = this.categories[0]
      this.current = id
      this.title = title
      this.limit = limit
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields()
  },
  destroyed() {
    if(this.select && this.select.destroy){
      this.select.destroy()
    }
  },
  methods:{
    async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }

      try{
        const categoryData = {
          title: this.title,
          limit: this.limit,
          id: this.current
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория была обновлена')
        this.$emit('updated', categoryData)

      }catch (e){
        console.log(e)
      }
    }
  },
  validations:{
    title: {required},
    limit: {required, minValue: minValue(100)}
  }
}
</script>
