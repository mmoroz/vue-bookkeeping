<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
import messages from "@/utils/messages";
export default {
  name: "EmptyLayout",
  computed:{
    error(){
      return this.$store.getters.error
    }
  },
  watch:{
    error(fbError){
      if(messages[fbError.code]){
        this.$error(messages[fbError.code])
      }else{
        this.$error(fbError.code)
      }
    }
  }
}
</script>