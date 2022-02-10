<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small blue-grey darken-3" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>

    </div>
    <Loader v-if="loading"/>
    <div v-else class="row">

      <HomeBill :rates="currency.rates"/>

      <HomeCurrency :rates="currency.rates" :date="new Date()"/>

    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";
export default {
  name: 'Home',
  data: ()=>({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency = {
      rates:{
        "RUB":85.445319,
        "USD":1.14325,
        "EUR":1,
      }
    }
    //this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods:{
    refresh(){
      this.loading = true
      setTimeout(()=>{
        this.currency = {
          rates:{
            "RUB":85.445319,
            "USD":1.14325,
            "EUR":1,
          }
        }
        this.loading = false
      }, 1000)
    }
  },
  components:{
    HomeCurrency,HomeBill
  }
}
</script>
