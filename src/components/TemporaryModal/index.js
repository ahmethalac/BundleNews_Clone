import React, {
    forwardRef, useImperativeHandle, useRef, useState
} from 'react';
import { Modal, StyleSheet, Animated } from 'react-native';

const styles = StyleSheet.create({
    modal: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const TemporaryModal = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);
    const opacity = useRef(new Animated.Value(1)).current;

    useImperativeHandle(ref, () => ({
        trigger: () => {
            setVisible(true);
            Animated.sequence([
                Animated.delay(props.delay ?? 200),
                Animated.timing(opacity, {
                    duration: props.duration ?? 600,
                    useNativeDriver: true,
                })
            ]).start(() => {
                setVisible(false);
                opacity.setValue(1);
            });
        }
    }));

    return (
        <Modal transparent visible={visible}>
            <Animated.View style={[styles.modal, { opacity }]}>
                {props.children}
            </Animated.View>
        </Modal>
    );
});

export default TemporaryModal;
