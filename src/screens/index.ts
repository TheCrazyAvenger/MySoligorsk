import { withStatusBar } from '@/hocs'
import { CityScreen as City } from './CityScreen'
import { HomeScreen as Home } from './HomeScreen'
import { MenuScreen as Menu } from './MenuScreen'
import { SignUpScreen as SignUp } from './SignUpScreen'
import { WelcomeScreen as Welcome } from './WelcomeScreen'

export const CityScreen = withStatusBar(City)
export const HomeScreen = withStatusBar(Home)
export const MenuScreen = withStatusBar(Menu)
export const SignUpScreen = withStatusBar(SignUp)
export const WelcomeScreen = withStatusBar(Welcome)
