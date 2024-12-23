// NotificationService.js
import { reactive } from 'vue';

export const NotificationService = reactive({
  notifications: [],
  addNotification(notification) {
    this.notifications.push(notification);
  },
  removeNotification(index) {
    this.notifications.splice(index, 1);
  },
});

// Componente donde se agregan notificaciones
import { NotificationService } from './NotificationService';

export default {
  methods: {
    notify() {
      NotificationService.addNotification({ message: 'Nueva notificación', type: 'success' });
    },
  },
};