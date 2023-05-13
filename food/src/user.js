import { computed, ref } from "vue";
import axiosClient from "./axios";
import store from "./store";
import createPersistedState from 'vuex-persistedstate'
function useUser  () {
    
        const user = ref([]); //from api call data
        const errors = ref("");
        const usersString = localStorage.getItem('setUsers')
        const usersObject = JSON.parse(usersString)
      
        const updateUser = async () => {
            errors.value = ''
            try {

                await axiosClient.patch(`/users/${usersObject.id}`, user.value)
                store.commit('setUsers', user.value)
                alert('Update Success')
                
            } catch (e) {
                if (e.response.status === 422) {
                    for (const key in e.response.data.errors) {
                        errors.value += e.response.data.errors[key][0] + ' ';
                    }
                }
            }
        }
        const showUser = async () => {
            console.log(usersObject)
            let response = await axiosClient.get(`/users/${usersObject.id}`);
            user.value = response.data.data;
            
            
        };
       
    
    return { user, errors, showUser,updateUser };
};
export default useUser;