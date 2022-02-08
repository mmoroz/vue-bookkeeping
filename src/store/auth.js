import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const TOKEN_KEY = 'jwt-token'

export default {
  state(){
    return {
      token: localStorage.getItem(TOKEN_KEY)
    }
  },
  mutations:{
    setToken(state, token){
      state.token = token
      localStorage.setItem(TOKEN_KEY,token)
    },
    logout(state){
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    }
  },
  actions: {

    async login({dispatch, commit}, {email, password}){
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          commit('setToken', user.accessToken)
          //console.log(user)
        })
        .catch((error) => {
          commit('setError', error)
          throw error.code
        });
    },

    async logout({commit}) {
      const auth = getAuth();
      await signOut(auth)
      await commit('clearInfo')
      commit('logout')
    },

    getUid(){
      const auth = getAuth();
      return auth.currentUser ? auth.currentUser.uid : null
    },

    async register({commit},{email, password, name}){
      const auth = getAuth();
      const db = getDatabase();
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //Запись в БД данных пользователя
          set(ref(db, `users/${user.uid}/info`), {
            name: name,
            email: email,
            bill : 10000
          });

        })
        .catch((error) => {
          commit('setError', error)
          throw error
        });
    },

  },
  getters:{
    token(state){
      return state.token
    },
    isAuthenticated(state){
      return !!state.token
    }
  }
}