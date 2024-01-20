import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cloneDeep } from 'lodash'
import { IBurgerDTO, IBurgerIngredientOptions } from './types'
import { useProductsStore } from '@/entities/products'
import { isBrioche, hasBrioches } from '../helpers/brioches'

export const useBurgerStore = defineStore('burger', () => {
  const productsStore = useProductsStore()
  const templateBurger: IBurgerDTO = {
    price: 0,
    ingredients: []
  }
  const burger = ref<IBurgerDTO>(cloneDeep(templateBurger))
  // Первоначальная версия бургера
  const oldBurger = ref<IBurgerDTO>(cloneDeep(templateBurger))

  const allIngredients = computed(() => burger.value.ingredients)
  const ingredients = computed(() => {
    return burger.value.ingredients.filter((ingredient: IBurgerIngredientOptions) => !isBrioche(ingredient.slug))
  })

  function setBurger(dto: IBurgerDTO) {
    burger.value = cloneDeep(dto)
    oldBurger.value = cloneDeep(dto)
  }

  function setOrderId(id: number) {
    burger.value.orderId = id
  }

  function setBrioches() {
    if (!hasBrioches(allIngredients.value)) {
      burger.value.ingredients.push(...(productsStore.brioches as IBurgerIngredientOptions[]))
      countPrice()
    }
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
    // Так как первыми идут булочки и они неудаляемы, индекс опускаеца на две позиции
    delete burger.value.ingredients[index + 2]
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

  return {
    burger,
    oldBurger,
    ingredients,
    allIngredients,
    setBurger,
    setOrderId,
    setBrioches,
    setIngredients,
    addIngredient,
    removeIngredient,
    clearState
  }
})
