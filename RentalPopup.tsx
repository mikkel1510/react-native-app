import { View, Text, Pressable, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Border, Colors, Spacing } from "./constants";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dispatch, SetStateAction } from "react";

interface popupProps{
    isRented: boolean;
    carName: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    selectedTimePeriod: string;
    setSelectedTimePeriod: Dispatch<SetStateAction<string>>;
    items: {label: string; value: string}[];
    date: Date;
    time: Date;
    toggleRented: () => void;
    togglePopUp: () => void;
}

export default function Popup({ isRented, carName, open, setOpen, selectedTimePeriod, setSelectedTimePeriod, items, date, time, toggleRented, togglePopUp, }: popupProps) {
    return (
        <View style={styles.popup}>
            { !isRented ? (           
                <View>
                    <View>
                        <View style={{ alignItems: 'center'}}>
                            <Text style={styles.header}>{carName}</Text>
                            </View>
                            <View>
                                <View style={[styles.popupRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                    <Text>Period</Text>          
                                    
                                    <DropDownPicker
                                        open={open}
                                        value={selectedTimePeriod}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setSelectedTimePeriod}
                                        containerStyle={styles.dropdown}

                                    />
                                    
                                </View>
                                <View style={[styles.popupRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                    <Text>Start date:</Text>
                                    <DateTimePicker value={date}/>
                                </View>
                                <View style={[styles.popupRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                    <Text>Start time:</Text>
                                    <DateTimePicker value={time} mode="time" minuteInterval={30}/>
                                </View>    
                            </View>
                        </View>
                        
                        <View style={styles.popupRow}>
                            <Pressable style={[styles.button, { backgroundColor: Colors.confirm }]} onPress={toggleRented}>
                                <Text style={styles.buttonText}>
                                    Confirm
                                </Text>
                            </Pressable>
                            <Pressable style={[styles.button, { backgroundColor: Colors.background }]} onPress={togglePopUp}>
                                <Text style={styles.buttonText}>
                                    Cancel
                                </Text>
                            </Pressable>
                        </View>
                </View> 
            ) : (
                <View style={styles.popup}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={styles.header}>End rental?</Text>
                    </View>
                    <View style={styles.popupRow}>
                        <Pressable style={[styles.button, { backgroundColor: Colors.accent }]} onPress={toggleRented}>
                            <Text style={styles.buttonText}>
                                Confirm
                            </Text>
                        </Pressable>
                        <Pressable style={[styles.button, { backgroundColor: Colors.background }]} onPress={togglePopUp}>
                            <Text style={styles.buttonText}>
                                Cancel
                            </Text>
                        </Pressable>
                    </View>
                </View>
            )} 
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 30
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: Colors.accent,
        paddingVertical: Spacing.small,
        paddingHorizontal: Spacing.large,
        borderRadius: Border.round,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.medium
    },
    popup: {
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: Border.round,
        padding: Spacing.medium
    },
    popupRow: {
        flexDirection: 'row', 
        gap: Spacing.small, 
        justifyContent: 'center',
        margin: Spacing.medium
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dropdown: {
        height: 50,
        width: 150,
    }
})