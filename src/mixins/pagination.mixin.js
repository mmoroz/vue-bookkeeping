import _ from "lodash";
export default {
  data(){
    return {
      page: +this.$route.query.page || 1,
      pageSize: 3,
      pageCount: 0,
      allItems: [],
      items:[]
    }
  },
  methods: {
    setupPagination(allItems){
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      if(this.page > this.pageCount){
        this.page = 1
        this.items = this.allItems[0]
        this.$router.push(`${this.$route.path}`)
      }else{
        this.items = this.allItems[this.page - 1]
      }

    },
    pageChangeHandler(page){
      if(page > 1) {
        this.$router.push(`${this.$route.path}?page=${page}`)
      }else{
        this.$router.push(`${this.$route.path}`)
      }
      this.items = this.allItems[page - 1] || this.allItems[0]
    }
  }
}