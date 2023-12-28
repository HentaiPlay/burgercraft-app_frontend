import { Router } from 'vue-router'
// Глобальный композабл для регистрации инстансов, что бы избежать
// использования provide/inject или форсировать невозможность их использования
export default { router: null } as { router: null | Router }
