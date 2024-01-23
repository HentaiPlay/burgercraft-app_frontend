import { BriochesTypeEnum } from '@/entities/products/model/types'
import { IBurgerIngredientOptions } from '../model/types'

export function isBrioche(slug: string) {
  return slug === BriochesTypeEnum.UP || slug === BriochesTypeEnum.DOWN
}

export function hasBrioches(ingredients: IBurgerIngredientOptions[]) {
  const brioches = {
    up: false,
    down: false
  }
  ingredients.forEach((ingredient) => {
    switch (ingredient.slug) {
      case BriochesTypeEnum.UP:
        brioches.up = true
        break
      case BriochesTypeEnum.DOWN:
        brioches.down = true
        break
    }
  })
  return brioches.up && brioches.down
}
