import { withStatusBar } from '@/hocs'
import { CityScreen as City } from './CityScreen'
import { HomeScreen as Home } from './HomeScreen'
import { MenuScreen as Menu } from './MenuScreen'

export const CityScreen = withStatusBar(City)
export const HomeScreen = withStatusBar(Home)
export const MenuScreen = withStatusBar(Menu)
