<template>
    <div class="location-picker">
      <h3>Selecione o ponto de entrega</h3>
      <div class="map-container">
        <!-- Mapa simplificado com pontos fixos -->
        <div class="campus-map">
          <div 
            v-for="point in deliveryPoints" 
            :key="point.id" 
            class="delivery-point"
            :class="{ 'selected': selectedPoint?.id === point.id }"
            @click="selectPoint(point)"
          >
            <span>{{ point.name }}</span>
          </div>
        </div>
      </div>
      <div v-if="showGpsOption" class="gps-option">
        <button @click="useCurrentLocation">
          <font-awesome-icon icon="location-crosshairs" />
          Usar minha localização atual
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useOrderStore } from '@/stores/order'
  
  const orderStore = useOrderStore()
  const selectedPoint = ref(null)
  const showGpsOption = ref(false)
  const emit = defineEmits(['point-selected', 'location-selected'])
  const deliveryPoints = computed(() => orderStore.deliveryPoints)
  
  const props = defineProps({
  showGpsOption: {
    type: Boolean,
    default: false
  }
})

  function selectPoint(point) {
    selectedPoint.value = point
    emit('point-selected', point)
  }
  
  function useCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            long: position.coords.longitude
          }
          emit('location-selected', location)
        },
        (error) => {
          console.error('Error getting location:', error)
          // Fallback to default point
          selectPoint(deliveryPoints.value[0])
        }
      )
    } else {
      alert('Geolocation is not supported by your browser')
      selectPoint(deliveryPoints.value[0])
    }
  }
  </script>
  
  <style scoped>
  .location-picker {
    margin: 20px 0;
  }
  .campus-map {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 15px;
  }
  .delivery-point {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .delivery-point:hover {
    background-color: #f5f5f5;
  }
  .delivery-point.selected {
    border-color: #42b983;
    background-color: #f0fff4;
  }
  .gps-option {
    margin-top: 20px;
  }
  </style>