import { getDatabase, ref, get, child} from "firebase/database";
export default {
  state:{
    info: {}
  },
  mutations:{
    setInfo(state, info){
      state.info = info
    },
    clearInfo(state){
      state.info = {}
    }
  },
  actions:{
    async fetchInfo({dispatch, commit}){
      const uid = await dispatch('getUid')
      const dbRef = ref(getDatabase());
      await get(child(dbRef, `users/${uid}/info`)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          commit('setInfo', data)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

    },
    async fetchCurrency(){
      const key = process.env.VUE_APP_FIXER
      console.log(process.env)
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
      return await res.json()
    }
  },
  getters:{
    info: s => s.info
  }
}