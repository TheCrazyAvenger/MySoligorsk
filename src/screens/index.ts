import { withStatusBar } from '@/hocs'
import { AcquaintanceAboutScreen as AcquaintanceAbout } from './AcquaintanceAboutScreen'
import { AcquaintanceBirthDateScreen as AcquaintanceBirthDate } from './AcquaintanceBirthDateScreen'
import { AcquaintanceNamesScreen as AcquaintanceNames } from './AcquaintanceNamesScreen'
import { AcquaintanceStartScreen as AcquaintanceStart } from './AcquaintanceStartScreen'
import { CityScreen as City } from './CityScreen'
import { HomeScreen as Home } from './HomeScreen'
import { MenuScreen as Menu } from './MenuScreen'
import { SignUpScreen as SignUp } from './SignUpScreen'
import { WelcomeScreen as Welcome } from './WelcomeScreen'

export const AcquaintanceAboutScreen = withStatusBar(AcquaintanceAbout)
export const AcquaintanceBirthDateScreen = withStatusBar(AcquaintanceBirthDate)
export const AcquaintanceStartScreen = withStatusBar(AcquaintanceStart)
export const AcquaintanceNamesScreen = withStatusBar(AcquaintanceNames)
export const CityScreen = withStatusBar(City)
export const HomeScreen = withStatusBar(Home)
export const MenuScreen = withStatusBar(Menu)
export const SignUpScreen = withStatusBar(SignUp)
export const WelcomeScreen = withStatusBar(Welcome)
