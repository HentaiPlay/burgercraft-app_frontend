import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cloneDeep } from 'lodash'
import { IBurgerDTO, IBurgerIngredientOptions } from './types'

export const useBurgerStore = defineStore('burger', () => {
  const templateBurger: IBurgerDTO = {
    price: 0,
    ingredients: []
  }
  const burger = ref<IBurgerDTO>(cloneDeep(templateBurger))

  const ingredients = computed(() => burger.value.ingredients)

  function setBurger(dto: IBurgerDTO) {
    burger.value = dto
  }

  function setOrderId(id: number) {
    burger.value.orderId = id
  }

  function setIngredients(dto: IBurgerIngredientOptions[]) {
    burger.value.ingredients = dto
    countPrice()
  }

  function addIngredient(dto: IBurgerIngredientOptions) {
    burger.value.ingredients.push(dto)
    countPrice()
  }

  function removeIngredient(index: number) {
    delete burger.value.ingredients[index]
    burger.value.ingredients = burger.value.ingredients.filter(Boolean)
    countPrice()
  }

  function countPrice() {
    burger.value.price = burger.value.ingredients.reduce((newPrice, ingredient) => {
      newPrice += ingredient.price
      return newPrice
    }, 0)
  }

  function clearState() {
    burger.value = cloneDeep(templateBurger)
  }

  return { burger, ingredients, setBurger, setOrderId, setIngredients, addIngredient, removeIngredient, clearState }
})
