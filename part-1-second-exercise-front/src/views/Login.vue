<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  if (localStorage.getItem('accessToken')) {
    router.push('/crud');
  }
});

const login = async () => {
  try {
    await authStore.login(email.value, password.value);
    router.push('/crud'); 
  } catch (error) {
    alert('Credenciales incorrectas');
  }
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" />
      <input v-model="password" placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
