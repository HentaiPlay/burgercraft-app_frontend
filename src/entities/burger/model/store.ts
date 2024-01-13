import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cloneDeep } from 'lodash'
import { IBurger, IBurgerIngredientOptions } from './types'

export const useBurgerStore = defineStore('burger', () => {
  const templateBurger: IBurger = {
    orderId: 0,
    price: 0,
    ingredients: []
  }
  const burger = ref<IBurger>(cloneDeep(templateBurger))

  const ingredients = computed(() => burger.value.ingredients)

  function setBurger(dto: IBurger) {
    burger.value = dto
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

  return { burger, ingredients, setBurger, setIngredients, addIngredient, removeIngredient, clearState }
})
