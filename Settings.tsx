import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable, onPressEdit} from "react-native";
import { Colors, Spacing, Border, Font } from "./constants";

const SettingsScreen: React.FC = () => {
    const navigation = useNavigation();
    const onEditName = () => {};
    const onEditEmail = () => {};

    return (
       <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.header}>Account Settings</Text>

            <View style={styles.box}>
                <Text style={styles.header2}>Account details</Text>

                <Card label='NAME' value='Niels Nailer' editButton='Edit' />
                <Card label='E-MAIL' value='nielsnailer@gmail.com' editButton='Edit' />
                <Card label='PHONE' value='+45 42502568' editButton='Edit' />
            </View>

            <View style={styles.box}>
                <Text style={styles.header2}>Settings</Text>

                <Card label='Language' value='English' editButton='Edit' />
                <Card label='Theme' value='Light' editButton='Edit' />
            </View>

            <View>
                <Pressable style={styles.logoutBtn}>
                    <Text style={styles.logoutBtnText}>Logout</Text>
                </Pressable>
            </View>

        </ScrollView>
       </SafeAreaView>
    );
};

type CardProps = {label: string; value: string; editButton?: () => void;};

const Card: React.FC<CardProps> = ({label, value, editButton}) => {
    return(
        <View style={styles.card}>
            <View>
            <Text style={styles.cardLabel}>{label}</Text>
            <Text>{value}</Text>
            </View>

            <Pressable onPress={onPressEdit} style={styles.editBtn}>
                <Text style={styles.cardLabel}>{editButton}</Text>
            </Pressable>
        </View>
        );
    };



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: Colors.background,
        },

    content: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 24,
        alignItems: "center",
      },

    header: {
        fontSize: Font.xlarge,
        fontWeight: 'bold',
        color: Colors.text,
        paddingBottom: 30,
        },

    box: {
         width: '97%',
         height: 'auto',
         backgroundColor: Colors.boxColor,
         borderRadius: 20,
         margin: 16,
         padding: 10,
        },

    header2: {
        fontSize: Font.large,
        color: Colors.text,
        },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 12,
        justifyContent: 'space-between',
        },

    cardLabel: {
        fontSize: Font.small,
        color: Colors.text,
        letterSpacing: 1,
        fontWeight: 'bold',
        },

    editBtn: {
        paddingHorizontal: '10%',
        paddingVertical: '2%',
        borderRadius: 20,
        backgroundColor: Colors.accent,
        },

    logoutBtn: {
        paddingHorizontal: '10%',
        paddingVertical: '2%',
        borderRadius: 20,
        backgroundColor: Colors.text,
        },

    logoutBtnText: {
        paddingHorizontal: '37%',
        color: Colors.boxColor,
        fontSize: Colors.large,
        }
    });

export default SettingsScreen;