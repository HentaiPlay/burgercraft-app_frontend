<script setup lang="ts">
  import { BurgerForm, useBurgerService } from '@/entities/burger'
  import { useOrdersStore } from '@/entities/orders'
  import { global, useMyConfirmDialog } from '@/shared/composables'

  const ordersStore = useOrdersStore()
  const burgerService = useBurgerService()
  const confirmDialog = useMyConfirmDialog()

  const removeBurger = (index: number) => {
    const message = global.i18n?.t('burger.list.confirm.remove') ?? ''
    confirmDialog({
      message: message,
      onConfirm: async () => {
        await burgerService.removeBurger(index)
      }
    })
  }
</script>

<template>
  <div class="burgers-list">
    <!-- Заголовок -->
    <div class="burgers-list__title">
      <span>{{ $t('burger.list.title') }}</span>
    </div>

    <div class="burgers-list__body">
      <div
        v-if="ordersStore.activeOrder.burgers.length"
        class="body__burgers-wrapper"
      >
        <!-- Бургеры -->
        <div
          v-for="(burger, i) in ordersStore.activeOrder.burgers"
          class="burger"
          :key="i"
        >
          <div class="burger__icon">
            <el-icon><Burger /></el-icon>
            <!-- Редактирование и удаление -->
            <div class="burger__actions">
              <BurgerForm
                mode="edit"
                :burger="burger"
              />
              <el-icon @click="removeBurger(i)"><Delete /></el-icon>
            </div>
          </div>

          <div class="burger__info">
            <span>{{ $t('burger.list.card.count', { number: burger.ingredients.length }) }}</span>
            <span>{{ $t('burger.list.card.price', { number: burger.price }) }}</span>
          </div>
        </div>
      </div>

      <!-- Заглушка -->
      <div
        v-else
        class="burgers-list__flap"
      >
        <span>{{ $t('burger.list.info.title') }}</span>
        <span class="flap__subtitle">({{ $t('burger.list.info.subtitle', { number: 1 }) }})</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .burgers-list__title {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: colors.$bg-color;
    border-radius: 10px 10px 0 0;
    border-top: 1px solid colors.$bg-color-overlay;
    border-left: 1px solid colors.$bg-color-overlay;
    border-right: 1px solid colors.$bg-color-overlay;
    font-size: 1.1em;
    color: colors.$primary;
    @include mixins.no__copy();
  }
  .burgers-list__body {
    height: 170px;
    overflow: hidden;
    width: auto;
    min-width: 300px;
    border-radius: 0 0 10px 10px;
    border: 1px solid colors.$bg-color-overlay;
  }
  .body__burgers-wrapper {
    height: 170px;
    overflow-y: scroll;
    width: auto;
    min-width: 300px;
    display: grid;
    gap: 10px;
    @include mixins.pa(10px);
    grid-template-columns: repeat(auto-fill, minmax(100px, 4fr));
    justify-content: center;
    justify-items: center;
    overflow-y: scroll;
  }
  .burger {
    position: relative;
    display: flex;
    height: 130px;
    width: 100%;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid colors.$bg-color-overlay;
    @include mixins.no__copy();
    &:hover {
      border: 2px solid colors.$bg-color-page;
    }
    &:hover .burger__actions {
      display: flex;
    }
  }
  .burger__icon {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5em;
    color: colors.$bg-color-overlay;
  }
  .burger__info {
    position: relative;
    @include mixins.mt(auto);
    @include mixins.pa(10px);
    display: flex;
    flex-direction: column;
    border-top: 1px solid colors.$bg-color-overlay;
  }
  .burger__actions {
    position: absolute;
    height: 100%;
    width: 100%;
    display: none;
    justify-content: center;
    align-items: center;
    font-size: 2.2rem;
    background-color: colors.$bg-color;
    overflow: hidden;
    i {
      @include mixins.pa(5px);
      &:hover {
        cursor: pointer;
        color: colors.$bg-color-page;
      }
    }
  }
  .burgers-list__flap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: auto;
    .flap__subtitle {
      @include mixins.mt(10px);
      font-size: 0.9em;
      color: colors.$warning;
    }
  }
</style>
