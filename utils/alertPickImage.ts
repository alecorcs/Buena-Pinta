import { addImage } from "@/db/beerAppDB";
import { Alert } from "react-native";
import { pickImage } from "./pickImage";

type UseFor = 'profile' | 'cover' | null;

// Holds the callback to be triggered once the image is selected and (optionally) classified
let onImageUse: ((url: string, useFor?: UseFor) => void) | null = null;

/**
 * Displays an alert to choose image source (camera or gallery).
 * After selection, uploads the image and optionally asks what the image is for (profile or cover).
 */
export const alertPickImage = (askUseType: boolean = true) => {
    Alert.alert(
        'Seleccionar imagen',
        '¿Cómo quieres añadir la imagen?',
        [
            {
                text: 'Desde la cámara',
                onPress: () => handlePick('camera', askUseType),
            },
            {
                text: 'Desde galería',
                onPress: () => handlePick('gallery', askUseType),
            },
            {
                text: 'Cancelar',
                style: 'cancel',
            },
        ],
        { cancelable: true }
    );
};

/**
 * Handles the full flow of picking and uploading an image.
 * If `askUseType` is true, prompts user to choose how the image will be used.
 */
const handlePick = async (
    source: 'camera' | 'gallery',
    askUseType: boolean
) => {
    const selectedUri = await pickImage(source);
    if (!selectedUri) return;

    const imageUrl = await addImage(selectedUri);
    if (!imageUrl) {
        Alert.alert('Error', 'No se pudo subir la imagen.');
        return;
    }

    if (askUseType) {
        Alert.alert(
            'Cambiar imagen',
            '¿Cuál deseas cambiar?',
            [
                {
                    text: 'De Perfil',
                    onPress: () => onImageUse?.(imageUrl, 'profile'),
                },
                {
                    text: 'De Portada',
                    onPress: () => onImageUse?.(imageUrl, 'cover'),
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    } else {
         // Just return the image URL with no additional context
        onImageUse?.(imageUrl);
    }
};

/**
 * Launches the full image selection flow.
 * Pass `askUseType` = false to skip the "Profile or Cover" prompt.
 */
export const launchImageFlow = (
    callback: (url: string, useFor?: UseFor) => void,
    askUseType: boolean = true
) => {
    onImageUse = callback;
    alertPickImage(askUseType);
};
