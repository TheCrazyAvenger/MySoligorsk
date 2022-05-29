import { withStatusBar } from '@/hocs'
import { AcquaintanceAboutScreen as AcquaintanceAbout } from './AcquaintanceAboutScreen'
import { AcquaintanceAddressScreen as AcquaintanceAddress } from './AcquaintanceAddressScreen'
import { AcquaintanceBirthDateScreen as AcquaintanceBirthDate } from './AcquaintanceBirthDateScreen'
import { AcquaintanceFinishScreen as AcquaintanceFinish } from './AcquaintanceFinishScreen'
import { AcquaintanceInterestsScreen as AcquaintanceInterests } from './AcquaintanceInterestsScreen'
import { AcquaintanceNamesScreen as AcquaintanceNames } from './AcquaintanceNamesScreen'
import { AcquaintanceStartScreen as AcquaintanceStart } from './AcquaintanceStartScreen'
import { CityScreen as City } from './CityScreen'
import { EmailVerificationScreen as EmailVerification } from './EmailVerificationScreen'
import { HomeScreen as Home } from './HomeScreen'
import { MenuScreen as Menu } from './MenuScreen'
import { PlacestoVisitDetailsScreen as PlacestoVisitDetails } from './PlacestoVisitDetailsScreen'
import { SignInScreen as SignIn } from './SignInScreen'
import { SignUpScreen as SignUp } from './SignUpScreen'
import { WelcomeScreen as Welcome } from './WelcomeScreen'

export const AcquaintanceAboutScreen = withStatusBar(AcquaintanceAbout)
export const AcquaintanceAddressScreen = withStatusBar(AcquaintanceAddress)
export const AcquaintanceBirthDateScreen = withStatusBar(AcquaintanceBirthDate)
export const AcquaintanceFinishScreen = withStatusBar(AcquaintanceFinish)
export const AcquaintanceInterestsScreen = withStatusBar(AcquaintanceInterests)
export const AcquaintanceStartScreen = withStatusBar(AcquaintanceStart)
export const AcquaintanceNamesScreen = withStatusBar(AcquaintanceNames)
export const CityScreen = withStatusBar(City)
export const EmailVerificationScreen = withStatusBar(EmailVerification)
export const HomeScreen = withStatusBar(Home)
export const MenuScreen = withStatusBar(Menu)
export const PlacestoVisitDetailsScreen = withStatusBar(PlacestoVisitDetails)
export const SignInScreen = withStatusBar(SignIn)
export const SignUpScreen = withStatusBar(SignUp)
export const WelcomeScreen = withStatusBar(Welcome)
