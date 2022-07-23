import { ConditionModal, MenuItem } from '@/components'
import { setUser } from '@/slices'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export const Account = () => {
  const dispatch = useDispatch()
  const handleLogout = async () => {
    await AsyncStorage.removeItem('isSignIn')
    await dispatch(setUser({ firstname: null, lastname: null, email: null, interests: null }))
    setLogoutModalVisible(false)
    auth().signOut()
  }

  const handleDeleteUser = async () => {
    await auth().currentUser?.delete()
    await handleLogout()
    setDeleteModalVisible(false)
  }

  const [logoutModalVisible, setLogoutModalVisible] = useState(false)
  const handleOpenLogoutModal = () => setLogoutModalVisible(true)
  const handleCloseLogoutModal = () => setLogoutModalVisible(false)

  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const handleOpenDeleteModal = () => setDeleteModalVisible(true)
  const handleCloseDeleteModal = () => setDeleteModalVisible(false)

  const accountData = [
    {
      title: 'Личная информация',
      color: '#FF7A00',
      icon: 'person',
      screen: null,
      id: 0,
    },
    {
      title: 'Выйти из аккаунта',
      color: '#35AC41',
      icon: 'key',
      onPress: handleOpenLogoutModal,
      id: 1,
    },
    {
      title: 'Удаление аккаунта',
      color: '#FF0000',
      icon: 'trash',
      onPress: handleOpenDeleteModal,
      id: 2,
    },
  ]

  return (
    <>
      <ConditionModal
        visible={logoutModalVisible}
        mainButtonTitle={'Выйти'}
        title={'Вы уверены что хотите выйти из аккаунта?'}
        description={'При повторном входе вам придется заново ввести логин и пароль'}
        onPressMainButton={handleLogout}
        onPressSecondaryButton={handleCloseLogoutModal}
      />
      <ConditionModal
        visible={deleteModalVisible}
        mainButtonTitle={'Удалить'}
        title={'Вы уверены что хотите удалить аккаунт?'}
        description={'При удалении аккаунта все ваши данные будут безвозвратно потеряны'}
        onPressMainButton={handleDeleteUser}
        onPressSecondaryButton={handleCloseDeleteModal}
      />
      <MenuItem title={'Управление аккаунтом'} data={accountData} />
    </>
  )
}
