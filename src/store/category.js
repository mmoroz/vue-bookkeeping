import {getDatabase, ref, set, push, child, get} from "firebase/database";

export default {

  actions:{

    async createCategory({dispatch,commit},{title,limit}){
      const uid = await dispatch('getUid')
      const db = getDatabase();
      const newPostKey = push(child(ref(db), 'categories')).key;

      const data = await set(ref(db, `/users/${uid}/categories/${newPostKey}`), {
        title: title,
        limit: limit
      }).then(() => {
        return {title, limit, id: newPostKey}
      })
      .catch((error)=>{
        commit('setError', error)
        throw error
      })
      return data
    },

    async fetchCategories({dispatch, commit}){
      const uid = await dispatch('getUid')
      const dbRef = ref(getDatabase());
      return await get(child(dbRef, `/users/${uid}/categories`)).then((snapshot) => {
        if (snapshot.exists()) {
          const cats = snapshot.val()
          // const categories = []
          // Object.keys(cats).forEach(key => {
          //   categories.push({
          //     title: cats[key].title,
          //     limit: cats[key].limit,
          //     id: key
          //   })
          // })
          // return categories
          return Object.keys(cats).map(key=>({...cats[key], id:key}))
        } else {
          return {}
        }
      }).catch((error) => {
        commit('setError', error)
        console.error(error);
      });
    },

    async updateCategory({commit, dispatch}, {title, limit, id}){
      const db = getDatabase();
      const uid = await dispatch('getUid')
      await set(ref(db, `users/${uid}/categories/${id}`), {
        title: title,
        limit: limit
      }).then(() => {

      }).catch((error)=>{
        commit('setError', error)
        throw error
      })
    }
  },

}