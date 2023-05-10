import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useUser() {
    const user = ref([])
    const clients = ref([])
 
    const errors = ref('')
    const router = useRouter()
    const updateUser = async (id) => {
        errors.value = ''
        try {
            await axios.patch(`/users/${id.value}`, user.value)
            
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }
    return updateUser
}