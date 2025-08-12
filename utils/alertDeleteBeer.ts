import { deleteBeer } from "@/db/beerAppDB";
import { router } from "expo-router";
import { Alert } from "react-native";

interface Prop {
    id: string;
    name: string;
}

export const alertDeleteBeer = ({ id, name }: Prop) => {
    Alert.alert(
        'Eliminar cerveza',
        `¿Estás seguro de que quieres eliminar ${name}?`,
        [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: () => {
                    deleteBeer(id)
                        .then(() => {
                            Alert.alert(
                                'Cerveza eliminada',
                                `${name} ha sido eliminada correctamente.`,
                                [{ text: 'OK', onPress: () => router.back() }],
                            );
                        })
                        .catch((error) => {
                            console.error('Error al eliminar la cerveza:', error);
                            Alert.alert('Error', 'No se pudo eliminar la cerveza.');
                        });
                },

            },
        ],
        { cancelable: true },
    );
}