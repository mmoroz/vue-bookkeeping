import {getDatabase, ref, set, push, child, get} from "firebase/database";

export default {

  actions:{
    async createRecord({dispatch, commit}, record){
      const uid = await dispatch('getUid')
      const db = getDatabase();
      const newPostKey = push(child(ref(db), 'records')).key;
      await set(ref(db, `/users/${uid}/records/${newPostKey}`), record).catch((error)=>{
        commit('setError', error)
        throw error
      })
    },
    async fetchRecords({dispatch, commit}){
      const uid = await dispatch('getUid')
      const dbRef = ref(getDatabase());
      return await get(child(dbRef, `/users/${uid}/records`)).then((snapshot) => {
        if (snapshot.exists()) {
          const records = snapshot.val()
          return Object.keys(records).map(key=>({...records[key], id:key}))
        } else {
          return {}
        }
      }).catch((error) => {
        commit('setError', error)
        console.error(error);
      });
    },
  }

}