import { useRef, useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, useColorScheme, useWindowDimensions, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';


import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { useCameraStore } from '@/presentation/store/useCameraStore';


export default function CameraScreen() {

    const primaryColor = useThemeColor({}, 'primary');
    const colorScheme = useColorScheme();

    const [facing, setFacing] = useState<CameraType>('back');
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
    const { addSelectedImage } = useCameraStore();


    const [selectedImage, setSelectedImage] = useState<string>()

    const cameraRef = useRef<CameraView>(null);

    const onRequestPermissions = async () => {
        try {
            const { status: cameraPermissionStatus } = await requestCameraPermission();
            if (cameraPermissionStatus !== 'granted') {
                Alert.alert('Lo siento', 'No se pudo obtener permisos para la cámara');
                return;
            }

            const { status: mediaPermissionStatus } = await requestMediaPermission();
            if (mediaPermissionStatus !== 'granted') {
                Alert.alert('Lo siento', 'No se pudo obtener permisos para la galería');
                return;
            }

        } catch (error) {
            console.log('Error requesting permissions:', error);
            Alert.alert('Error', 'No se pudo obtener permisos para la cámara');

        }
    }

    const onShutterButtonPressed = async () => {
        if (cameraRef.current) {
            const picture = await cameraRef.current.takePictureAsync({
                quality: 0.7
            });

            console.log('Picture taken:', picture);

            if (!picture?.uri) {
                return;
            }

            setSelectedImage(picture.uri);
            //TODO: guardar imagen
        }
    }

    const onReturnCancel = () => {
        //TODO: limpiar estado
        router.dismiss();
    }

    const onPictureAccepted = async () => {
        //implementar función para aceptar la imagen
        if (!selectedImage) {
            return;
        }
        await MediaLibrary.createAssetAsync(selectedImage);
        //console.log('Picture accepted:', selectedImage);
        addSelectedImage(selectedImage);

        router.dismiss();
    }

    const onPickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
            aspect: [4, 3], //4ancho:3alto
            //allowsEditing: true,
            allowsMultipleSelection: true,
            selectionLimit: 5,
        })

        if (result.canceled) {
            return;
        }

        //add images to the store
        result.assets.forEach(asset => addSelectedImage(asset.uri));
        router.dismiss();

        //console.log('Image picked:', result.assets);
    }


    if (!cameraPermission) {
        // Camera permissions are still loading.
        return <View />;
        //return router.dismiss();
    }

    if (selectedImage) {
        return (
            <View style={styles.container}>
                <Image source={{ uri: selectedImage }} style={styles.camera} />
                <ReturnCancelButton onPress={onReturnCancel} />
                <ConfirmImageButton onPress={onPictureAccepted} />
                <RetakeImageButton onPress={() => setSelectedImage(undefined)} />
            </View>
        );
    }

    if (!cameraPermission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={{ flex: 1 }}>
                {/* Gradient Background */}
                <LinearGradient
                    colors={
                        colorScheme === 'dark'
                            ? [primaryColor, '#5e2ced', 'black']
                            : ['#3D64F4', '#17c7bd', 'white']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0.3, y: 0.4 }}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                />
                <View style={{
                    ...styles.container,
                    marginHorizontal: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <ThemedText style={styles.message}>
                        Necesitamos permiso para usar la cámara  la galería
                    </ThemedText>

                    <TouchableOpacity onPress={onRequestPermissions}>
                        <ThemedText type='subtitle' style={{ color: primaryColor }}>
                            Solicitar permiso
                        </ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }




    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing={facing}>

                <ShutterButton onPress={onShutterButtonPressed} />

                <FlipCameraButton onPress={toggleCameraFacing} />

                {/* TODO */}
                <GalleryButton onPress={onPickImages} />

                <ReturnCancelButton onPress={onReturnCancel} />

                {/* <TouchableOpacity style={styles.galleryButton} onPress={openGallery}>
                        <Ionicons name='images-outline' size={30} color='white' />
                    </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity> */}

            </CameraView>
        </View>
    );
}

//Custom Components
const ShutterButton = ({ onPress = () => { } }) => {

    const dimensions = useWindowDimensions();
    const primaryColor = useThemeColor({}, 'primary');

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.shutterButton,
                {
                    position: 'absolute',
                    bottom: 30,
                    left: dimensions.width / 2 - 32,
                    borderColor: primaryColor,
                }
            ]}

        ></TouchableOpacity>
    );
}


const FlipCameraButton = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity style={styles.flipCameraButton} onPress={onPress}>
            <Ionicons name='camera-reverse-outline' size={30} color='white' />
        </TouchableOpacity>
    )
}

const GalleryButton = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity style={styles.galleryButton} onPress={onPress}>
            <Ionicons name='images-outline' size={30} color='white' />
        </TouchableOpacity>
    )
}

const ReturnCancelButton = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity style={styles.returnCancelButton} onPress={onPress}>
            <Ionicons name='arrow-back-outline' size={30} color='white' />
        </TouchableOpacity>
    )
}


const ConfirmImageButton = ({ onPress = () => { } }) => {

    const dimensions = useWindowDimensions();
    const primaryColor = useThemeColor({}, 'primary');

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.shutterButton,
                {
                    position: 'absolute',
                    bottom: 30,
                    left: dimensions.width / 2 - 32,
                    borderColor: primaryColor,
                }
            ]}

        >
            <Ionicons name='checkmark' size={30} color={primaryColor} />

        </TouchableOpacity>
    );
}


const RetakeImageButton = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity style={styles.flipCameraButton} onPress={onPress}>
            <Ionicons name='close-outline' size={30} color='white' />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },

    shutterButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'white',
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    flipCameraButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        bottom: 40,
        right: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },

    galleryButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        bottom: 40,
        left: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },

    returnCancelButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#17202A',
        position: 'absolute',
        top: 40,
        left: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
