<template>
  <div class="rating-display">
    <span 
      v-for="star in 5" 
      :key="star" 
      class="star"
      :class="{ 'filled': star <= filledStars }"
    >
      <font-awesome-icon :icon="starIcon(star)" />
    </span>
    <span v-if="showValue" class="rating-value">
      {{ formattedRating }}
    </span>
  </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'

const props = defineProps({
  rating: {
    type: [Number, String],
    default: 0,
    validator: value => {
      const num = Number(value)
      return num >= 0 && num <= 5
    }
  },
  showValue: {
    type: Boolean,
    default: false
  }
})

const filledStars = computed(() => {
  const num = Number(props.rating)
  return Math.round(num || 0)
})

const formattedRating = computed(() => {
  const num = Number(props.rating)
  return isNaN(num) ? '0.0' : num.toFixed(1)
})

function starIcon(star) {
  return star <= filledStars.value ? 'star' : ['far', 'star']
}
  </script>
  
  <style scoped>
  .rating-display {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  
  .star {
    color: #ddd;
    font-size: 0.9rem;
  }
  
  .star.filled {
    color: #ffc107;
  }
  
  .rating-value {
    margin-left: 5px;
    font-size: 0.8rem;
    color: #666;
  }
  </style>