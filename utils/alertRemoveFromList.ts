import { deleteBeerFromList } from "@/db/beerAppDB";
import { Alert } from "react-native";

interface Prop {
    beerName: string;
    listName: string;
    listId?: string;
    beerId?: string;
}

export const alertRemoveFromList = ({ beerName, listName, beerId, listId }: Prop) => {

    Alert.alert(
        'Sacar de la lista',
        `¿Estás seguro de que quieres sacar ${beerName} de la lista ${listName} ?`,
        [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Sacar',
                style: 'destructive',
                onPress: () => {
                    if (!beerId || !listId) {
                        Alert.alert('Error', 'No se pudo identificar la cerveza o la lista.');
                        return;
                    }
                    deleteBeerFromList(listId, beerId)
                        .then(() => {
                            Alert.alert(
                                'Cerveza sacada de la lista',
                                `${beerName} ha sido sacada correctamente de la lista ${listName}.`,
                                [{ text: 'OK' }],
                            );
                        })
                        .catch((error) => {
                            console.error('Error al sacar la cerveza de la lista:', error);
                            Alert.alert('Error', 'No se pudo sacar la cerveza de la lista.');
                        });
                },
            },
        ],
        { cancelable: true },
    );
}