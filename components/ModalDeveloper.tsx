import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

interface ModalProps {
 visible: boolean;
 modalClose: () => void

}

const ModalDeveloper = ({visible, modalClose}:ModalProps) => {
  return (
    <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={modalClose}
            >
                <TouchableWithoutFeedback onPress={modalClose}>
                    <View className="flex-1 bg-black/40">
                        <TouchableWithoutFeedback>
                            <View className="mt-auto bg-white rounded-t-2xl px-4 pt-4 pb-8">
                                <View className="flex-row justify-between items-center mb-4">
                                    <Text className="text-lg font-bold text-gray-800">Información del Desarrollador</Text>
                                    <TouchableOpacity onPress={modalClose}>
                                        <Ionicons name="close-outline" size={28} color="gray" />
                                    </TouchableOpacity>
                                </View>
                                <Text className="text-base mb-4">
                                    🚀 Nombre: Alejandro Corral
                                    {"\n"}💻 GitHub: github.com/alecorcs/alecorcs
                                    {"\n"}📧 Email: lexcor1995@gmail.com
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
  )
}

export default ModalDeveloper