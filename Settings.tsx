import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, SafeAreaView} from "react-native";
import { Colors, Spacing, Border, Font } from "./constants";
import ButtonComponent from "./components/ButtonComponent";

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

                <Card label='NAME' value='Niels Nailer'  />
                <Card label='E-MAIL' value='nielsnailer@gmail.com'  />
                <Card label='PHONE' value='+45 42502568'  />
            </View>

            <View style={styles.box}>
                <Text style={styles.header2}>Settings</Text>

                <Card label='Language' value='English'  />
                <Card label='Theme' value='Light'  />
            </View>

            <View>
                <ButtonComponent label="Logout" backgroundColor={Colors.text}/>
            </View>

        </ScrollView>
       </SafeAreaView>
    );
};

type CardProps = {label: string; value: string;};

const Card: React.FC<CardProps> = ({label, value}) => {
    return(
        <View style={styles.card}>
            <View>
            <Text style={styles.cardLabel}>{label}</Text>
            <Text>{value}</Text>
            </View>
            <ButtonComponent label="Edit"/>
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
    });

export default SettingsScreen;