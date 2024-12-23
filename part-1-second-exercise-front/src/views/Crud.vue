<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUserStore } from '../store/users';

const userStore = useUserStore();

onMounted(userStore.fetchUsers);
</script>

<template>
  <div>
    <h1>Gestión de usuarios</h1>

    <div>
      <h2>Crear usuarios</h2>
      <form @submit.prevent="userStore.createUser">
        <input v-model="userStore.newUser.name" placeholder="Name" />
        <input v-model="userStore.newUser.email" placeholder="Email" type="email" />
        <button type="submit">Create</button>
        <p v-if="userStore.errorMessage" style="color: red;">{{ userStore.errorMessage }}</p>
      </form>
    </div>

    <h2>Usuarios</h2>
    <ul>
      <li v-for="user in userStore.users" :key="user.id">
        <span v-if="userStore.editingUser?.id !== user.id">
          {{ user.name }} - {{ user.email }}
          <button @click="userStore.editUser(user)">Editar</button>
          <button @click="userStore.deleteUser(user.id)">Eliminar</button>
        </span>
        <span v-else>
          <input v-model="userStore.editingUser.name" placeholder="Name" />
          <input v-model="userStore.editingUser.email" placeholder="Email" type="email" />
          <button @click="userStore.saveUser">Save</button>
          <button @click="() => (userStore.editingUser = null)">Cancelar</button>
        </span>
      </li>
    </ul>
  </div>
</template>
