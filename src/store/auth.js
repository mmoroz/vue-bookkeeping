import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default {
  actions: {
    async login({dispatch, commit}, {email, password}){
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //console.log(user)
        })
        .catch((error) => {
          commit('setError', error)
          throw error.code
        });
    },

    async logout() {
      const auth = getAuth();
      await signOut(auth)
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

  }
}