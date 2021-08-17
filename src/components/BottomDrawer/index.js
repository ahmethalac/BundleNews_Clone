import React, { useEffect, useRef, useState } from 'react';
import {
    Animated, PanResponder, Modal, Pressable
} from 'react-native';
import styles from './styles';

const animationConfig = {
    useNativeDriver: true,
    restSpeedThreshold: 1000,
    restDisplacementThreshold: 10,
};
export default function BottomDrawer({
    isOpen,
    toggleOpen,
    backdropOpacity = 0.6,
    onDrawerOpen,
    onDrawerClose,
    containerStyles,
    children,
}) {
    const height = useRef(0);
    const [visible, setVisible] = useState(true);
    const y = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const [ready, setReady] = useState(false);

    const waitForHeight = callback => {
        if (height.current !== 0) {
            callback();
        } else {
            setTimeout(() => { waitForHeight(callback); }, 25);
        }
    };

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            waitForHeight(openDrawer);
        } else {
            closeDrawer();
        }
    }, [isOpen]);

    const openDrawer = ({ dontTriggerCallback } = {}) => {
        Animated.spring(opacity, {
            toValue: backdropOpacity,
            useNativeDriver: true,
        }).start();
        Animated.spring(y, {
            toValue: 0,
            ...animationConfig
        }).start(finished => {
            if (onDrawerOpen && !dontTriggerCallback) {
                onDrawerOpen(finished);
            }
        });
    };

    const closeDrawer = () => {
        Animated.spring(opacity, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
        Animated.spring(y, {
            toValue: height.current,
            ...animationConfig
        }).start(finished => {
            setVisible(false);
            if (onDrawerClose) {
                onDrawerClose(finished);
            }
        });
    };

    const handleFirstRender = ({ nativeEvent: { layout } }) => {
        if (height.current === 0) {
            // Since height is determined after first mount (because of onLayout prop),
            // y needs to be initialized to height
            height.current = layout.height;
            y.setValue(height.current);
            opacity.setValue(backdropOpacity);
            if (!ready) setTimeout(() => setReady(true), 0);
        }
    };

    const onPanResponderRelease = (event, { dy, vy }) => {
        if (dy <= height.current / 2 && vy < 1) {
            if (dy > 0) {
                openDrawer({ dontTriggerCallback: true });
            }
        } else if (isOpen) {
            toggleOpen(false);
        }
    };
    const onMoveShouldSetPanResponder = (event, { dy }) => Math.abs(dy) >= 10;
    const onPanResponderMove = (event, { dy }) => {
        if (dy > 0) {
            Animated.spring(y, {
                toValue: dy,
                bounciness: 0,
                speed: 1000,
                ...animationConfig
            }).start();
        }
    };
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder,
        onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
        onPanResponderMove,
        onPanResponderRelease,
    });

    return (
        <Modal
            transparent
            visible={visible}
            // eslint-disable-next-line indent
        >
            <Animated.View
                {...panResponder.panHandlers}
                style={{
                    height: '100%',
                    opacity
                }}
            >
                <Pressable
                    style={styles.backdrop}
                    onPress={() => {
                        if (isOpen) toggleOpen(false);
                    }}
                />
            </Animated.View>
            <Animated.View
                {...panResponder.panHandlers}
                onLayout={handleFirstRender}
                style={[
                    styles.drawer,
                    {
                        transform: [{ translateY: y }],
                        opacity: ready ? 1 : 0,
                    }
                ]}
            >
                <Pressable style={containerStyles}>
                    {children}
                </Pressable>
            </Animated.View>
        </Modal>
    );
}
