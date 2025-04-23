import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faUser, 
  faShoppingCart, 
  faSearch, 
  faLocationCrosshairs,
  faTimes,
  faTrash,
  faStar,
  faStarHalfStroke,
  faMapMarkerAlt,
  faClock,
  faMoneyBillWave,
  faUsers,
  faStore,
  faList,
  faCog,
  faTicketAlt,
  faHandsHelping,
  faUserCog,
  faArrowLeft, 
  faPlus,
  faCheck
} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Adicionar ícones à biblioteca
library.add(
  faUser, 
  faShoppingCart, 
  faSearch, 
  faLocationCrosshairs,
  faTimes,
  faTrash,
  faStar,
  faStarHalfStroke,
  faMapMarkerAlt,
  faClock,
  faMoneyBillWave,
  faUsers,
  faStore,
  faList,
  faCog,
  faGoogle,
  faTicketAlt,
  faHandsHelping,
  faUserCog,
  faArrowLeft, 
  faPlus,
  faCheck
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')