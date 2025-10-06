import React from 'react';
import { Pressable, Text, Image, StyleSheet, ViewStyle, ImageSourcePropType, TextStyle, View} from 'react-native';
import { Colors, Border, Spacing, Font } from '../constants';
import { labels } from '../cars';

interface ButtonProps {
    label?: string;
    onPress: () => void
    backgroundColor?: string;
    textColor?: string;
    labelStyle?: TextStyle | TextStyle[];
    icon?: ImageSourcePropType;
    style?: ViewStyle | ViewStyle[];
    extraText?: string | string[],
    extraTextStyle?: TextStyle | TextStyle[];
}

const ButtonComponent: React.FC<ButtonProps> = ({
    label,
    onPress,
    backgroundColor = Colors.accent,
    textColor = "#fff",
    labelStyle,
    icon,
    extraText,
    extraTextStyle,
    style
}) => {
      const extraTexts = Array.isArray(extraText) ? extraText : extraText ? [extraText] : [];

    return (
        <Pressable
        style={[styles.button, {backgroundColor}, style]}
        onPress={onPress}
        >
            <View style={styles.textContainer}>
                <Text style={[styles.label, { color: textColor }, labelStyle]}>{label}</Text>
                
                {extraTexts.map((txt, index) => (
                    <Text
                    key={index}
                    style={Array.isArray(extraTextStyle) ? extraTextStyle[index] : extraTextStyle}
                    >
                        {txt}
                    </Text>
                ))}
            </View>
                {icon && (
                    <Image
                    source = {icon}
                    style = {styles.icon}
                    />
                )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        paddingVertical: Spacing.small,
        paddingHorizontal: Spacing.large,
        borderRadius: Border.round,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.medium
    },
    textContainer: {
    flexDirection: "column",  
    alignItems: "flex-start", 
    gap: Spacing.small,
  },
    label: {
        fontSize: Font.medium,
        fontWeight: 'bold',
    },
    icon: {
        width: 35,
        height: 35,
        resizeMode: "contain",
    }
})
export default ButtonComponent;
