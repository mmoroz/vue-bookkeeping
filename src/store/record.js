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
  }

}