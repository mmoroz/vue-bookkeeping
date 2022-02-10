<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="!loading && categories.length">
      <div class="page-title">
        <h3>Новая запись</h3>
      </div>
      <form class="form" @submit.prevent="submitHandler">

        <label>Выберите категорию</label>
        <select class="browser-default" v-model="category">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id"> {{ cat.title }}</option>
        </select>

        <p>
          <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="income"
                v-model="type"
            />
            <span>Доход</span>
          </label>
        </p>

        <p>
          <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="outcome"
                v-model="type"
            />
            <span>Расход</span>
          </label>
        </p>

        <div class="input-field">
          <input
              id="amount"
              type="number"
              v-model.number="price"
              :class="{invalid: ($v.price.$dirty && !$v.price.minValue) || ($v.price.$dirty && !$v.price.required)}"
          >
          <label for="amount">Сумма</label>
          <span class="helper-text invalid" v-if="$v.price.$dirty && !$v.price.minValue">Минимальная величина {{ $v.price.$params.minValue.min }}</span>
          <span class="helper-text invalid" v-if="$v.price.$dirty && !$v.price.required">Введите лимит</span>
        </div>

        <div class="input-field">
          <input
              id="description"
              type="text"
              v-model.trim="desc"
              :class="{invalid: ($v.desc.$dirty && !$v.desc.required)}"
          >
          <label for="description">Описание</label>
          <span class="helper-text invalid" v-if="$v.desc.$dirty && !$v.desc.required">Введите описание</span>
        </div>

        <button class="btn waves-effect waves-light blue-grey darken-3" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/ui/Loader";
import {minValue, required} from "vuelidate/lib/validators";
import {mapGetters} from 'vuex'

export default {
  name: "Record",
  data:()=>({
    select: null,
    categories: [],
    loading: true,
    category: null,
    type: 'outcome',
    price: null,
    desc:''
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.category = this.categories[0].id
    this.loading = false
  },
  computed:{
    ...mapGetters(['info']),
    canCreateRecord(){
      if(this.type === 'income'){
        return true
      }
      return  this.info.bill >= this.price
    }
  },
  methods:{
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if(this.canCreateRecord){
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.price,
            description: this.desc,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill =
              this.type === 'income'
                  ? this.info.bill + this.price
                  : this.info.bill - this.price

          await this.$store.dispatch('updateInfo', { bill })
          this.$message('Запись успешно создана!');

          this.$v.$reset()
          this.price = ''
          this.desc = ''
        } catch (e) {}
      }else{
        this.$message(`Недостаточно средств на счете (${this.price - this.info.bill})`)
      }

    }
  },
  components:{
    Loader
  },
  validations:{
    desc: {required},
    price: {required, minValue: minValue(1)}
  }
}
</script>

<style scoped>

</style>