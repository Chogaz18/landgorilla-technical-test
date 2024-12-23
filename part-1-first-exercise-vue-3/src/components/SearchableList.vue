<template>
    <div class="searchable-list-container">
        <input class="search-input" v-model="searchQuery" placeholder="Buscar..."   />
        <div class="loading-container" v-if="loading">
            <span class="spinner"></span>
        </div>
        <div class="list-container" v-else>
            <ul>
                <li v-for="item in filteredItems" :key="item.id"> {{ item.title }}</li>
            </ul>
            <Pagination :currentPage='currentPage' :totalPages='totalPages' @updatePage='val=>currentPage = val' />
        </div>
        
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
import Pagination from './Pagination.vue'
import {normalizeText} from '../utils/functions.util'

const items = ref([] as any[]);
const filteredItemsArray = ref([] as any[]);

const searchQuery = ref('');
const loading = ref(false)

const fetchItems = async () => {
    loading.value = true
    try {
        const { data } = await axios.get('https://fakestoreapi.com/products');
        items.value = data;
    } catch (error) {
        console.error('Error fetching items:', error);
    } finally {
        loading.value = false
    }
};

fetchItems()


// Propiedad computada filteredItems:
// Utilizo `computed` para calcular dinámicamente los elementos que deben mostrarse en función del texto ingresado en el campo de búsqueda (searchQuery).
// El sistema de reactividad de Vue permite que esta propiedad se actualice automáticamente cuando cambian las dependencias, es decir, el array `items` o el valor de `searchQuery`.
// También aplico la paginación dentro de esta propiedad, retornando solo los elementos correspondientes a la página actual (currentPage), esto a través de mi función de paginación.


const filteredItems = computed((): any => {
    filteredItemsArray.value = items.value
    if(searchQuery.value.length > 0) {
        filteredItemsArray.value = items.value.filter((item: any) => normalizeText(item.title).toLowerCase().includes(normalizeText(searchQuery.value).toLowerCase()))
    }   
    return getPaginatedItems(filteredItemsArray.value, currentPage.value, itemsPerPage.value) as any[]
});


const getPaginatedItems = (array: any[], actualPage: number, itemsQuantity: number) => {
  const startIndex = itemsQuantity ? (actualPage - 1) * itemsQuantity : 0
  const finalIndex = itemsQuantity ? startIndex + itemsQuantity : array?.length
  const paginatedItems = array.slice(startIndex, finalIndex) || array
  return paginatedItems
}

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
    if (currentPage.value < totalPages.value.length) currentPage.value++;
};


const itemsPerPage = ref(3)
const currentPage = ref(1)

// Propiedad computada totalPages:
// Aquí utilizo `computed` para calcular cuántas páginas son necesarias en función del número total de elementos filtrados y la cantidad de elementos por página (itemsPerPage).
// El uso de `computed` asegura que esta propiedad se actualice automáticamente si cambia alguno de estos valores, garantizando una paginación precisa.
const totalPages = computed(()=>{
  const total = Math.ceil(filteredItemsArray.value.length / itemsPerPage.value)
  const pages = Array.from(Array(total), (_, index) => index + 1)
  return pages
})
</script>
  
<style scoped>

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
}

</style>
<style lang="sass" scoped>
.searchable-list-container 
    display: flex
    flex-direction: column
    gap: 16px
    .search-input
        width: 320px
        padding: 16px
        border-radius: 12px
        max-height: 40px
    .loading-container
        display: flex
        justify-content: center
        align-items: center
        height: 300px
        .spinner
            width: 50px
            height: 50px
            margin-bottom: 2px
            border: 3px solid #FFF
            border-bottom-color: #163955
            border-radius: 50%
            display: inline-block
            box-sizing: border-box
            animation: rotation 1s linear infinite
            @keyframes rotation 
                0% 
                    transform: rotate(0deg)
                100% 
                    transform: rotate(360deg)
    .list-container
        display: flex
        flex-direction: column
        width: 400px
        gap: 16px

</style>
  