import { useAuthStore } from "./store/authStore"

function App() {

  const {token, email} = useAuthStore(state => ({token: state.token, email: state.email}))
  const updateAuth = useAuthStore(state => state.updateAuth)
  const clearAuth = useAuthStore(state => state.clearAuth)

  return (
    <div className="">
      <p>token: {token}</p>
      <p>email: {email}</p>
      <button 
        onClick={() => updateAuth({token: "3sflfjlksj", username: "John", email: "John@gmail.com"})}>
        add
      </button>

      <button 
        onClick={() => clearAuth()}>
        clear
      </button>
      
    </div>
  )
}

export default App
