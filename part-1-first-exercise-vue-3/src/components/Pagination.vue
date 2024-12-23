<script setup lang="ts">
import { computed } from 'vue'

interface PaginationInterface {
  currentPage: number,
  totalPages: number[],
}

const props = defineProps<PaginationInterface>()

const emit = defineEmits(['updatePage'])

const visiblePages = 5

// Utilizo el sistema de reactividad de Vue a través de la propiedad computada `availablePages`.
// Esta propiedad calcula dinámicamente las páginas visibles en función de `props.currentPage` y `props.totalPages`.
// La reactividad asegura que cualquier cambio en estos valores se refleje automáticamente en la paginación sin necesidad de intervención manual.
// Esto optimiza el rendimiento y facilita la actualización del componente cuando cambian las dependencias.
// Además, las funciones `previousPage`, `nextPage` y `goToPage` utilizan `emit` para actualizar el estado en el componente padre de manera reactiva.
// Esto permite que el control de la paginación esté sincronizado con los datos y las acciones del usuario.


const availablePages = computed(() => {
  const totalPagesArray = props.totalPages || []
  const currentPage = props.currentPage || 1
  const totalPages = totalPagesArray.length
  const pages = []

  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2))
  let endPage = Math.min(totalPages, startPage + visiblePages - 1)

  if (endPage - startPage < visiblePages - 1) {
    startPage = Math.max(1, endPage - visiblePages + 1)
  }

  if (startPage > 1) {
    pages.push(1)
    if (startPage > 2) pages.push('...')
  }

  for (let page = startPage; page <= endPage; page++) pages.push(page)

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pages.push('...')
    pages.push(totalPages)
  }
  return pages
})

const previousPage = () => {
  if (props.currentPage > 1) emit('updatePage', props.currentPage - 1)
}

const nextPage = () => {
  if (props.currentPage < props.totalPages.length)  emit('updatePage', props.currentPage + 1)
}

const goToPage = (page: number | string) => {
  if (page !== '...') emit('updatePage', page)
}
</script>

<template>
<ul class="pagination">
    <li class="direction-page" :class="{ disabled: currentPage === 1 }" @click="previousPage()">
      <span class="page-link">Anterior</span>
    </li>
    <li class="page-item" v-for="page in availablePages" :key="page" @click="goToPage(page)"
      :class="{ active: page === currentPage, disabled: page === '...' }"
    >
      <span class="page-link" >{{ page }}</span>
    </li>
    <li class="direction-page" :class="{ disabled: currentPage === totalPages?.length }" @click="nextPage()">
      <span class="page-link">Siguiente</span>
    </li>
</ul>
</template>

<style lang="sass" scoped>


.pagination
  display: flex
  flex-direction: row
  gap: 12px
  align-items: center
  .direction-page
    cursor: pointer
    color: green
    &.disabled
      cursor: not-allowed
      opacity: 0.5
  .page-item
    display: flex
    justify-content: center
    align-items: center
    min-width: 30px
    height: 30px
    cursor: pointer
    border-radius: 50%
    
    &.active
      background-color: #163955
      color: white
</style>
