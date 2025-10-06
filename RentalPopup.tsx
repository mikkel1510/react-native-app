import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Border, Colors, Font, Spacing } from "./constants";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import ButtonComponent from "./components/ButtonComponent";

interface popupProps{
    isRented: boolean;
    carName: string;
    toggleRented: () => void;
    rent: (startDate: Date, timePeriod: string) => void;
    togglePopUp: () => void;
}

export default function Popup({ isRented, carName, toggleRented, rent, togglePopUp, }: popupProps) {
    const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    
    const now = new Date();
    now.setMinutes(now.getMinutes() < 30 ? 30 : 60); {/* Round current time up to next half hour */}
    now.setSeconds(0);
    now.setMilliseconds(0);
    const [currentTime, setTime] = useState(now)
    
    const process = () => {
        if (selectedTimePeriod === ""){
            setErrorMessage("Please select a time period")
        } else {
            rent(currentTime, selectedTimePeriod)
        }
    }
    
    const [open, setOpen] = useState(false);
    const items = [
        { label: "1 hour", value: "1" },
        { label: "6 hours", value: "6" },
        { label: "24 hours", value: "24" }
    ]
    
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
                                    <Text style={styles.subHeader}>Period:</Text>          
                                    
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
                                    <Text style={styles.subHeader}>Start date:</Text>
                                    <DateTimePicker value={currentTime} minimumDate={new Date()} onChange={(event, selectedDate) => { if(selectedDate) { setTime(selectedDate) } }}/>
                                </View>
                                <View style={[styles.popupRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                    <Text style={styles.subHeader}>Start time:</Text>
                                    <DateTimePicker value={currentTime} mode="time" timeZoneName={'Europe/Copenhagen'} minuteInterval={30} onChange={(event, selectedTime) => { if (selectedTime){ setTime(selectedTime) } }}/>
                                </View>    
                            </View>
                        </View>

                        { errorMessage && (
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.error}>{errorMessage}</Text>
                            </View>
                            )
                        }
                        
                        <View style={styles.popupRow}>
                            <ButtonComponent onPress={process} label="Confirm" backgroundColor={Colors.confirm}/>
                            <ButtonComponent onPress={togglePopUp} label="Cancel" backgroundColor={Colors.background} textColor={Colors.primary}/>

                        </View>
                </View> 
            ) : (
                <View style={styles.popup}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={styles.header}>End rental?</Text>
                    </View>
                    <View style={styles.popupRow}>
                        <ButtonComponent onPress={toggleRented} label="Confirm" backgroundColor={Colors.confirm}/>
                        <ButtonComponent onPress={togglePopUp} label="Cancel" backgroundColor={Colors.background} textColor="#000"/>
                    </View>
                </View>
            )} 
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: Font.large,
        fontFamily: Font.font
    },
    subHeader: {
        fontSize: Font.medium,
        fontFamily: Font.font
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: Font.font
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
    },
    error: {
        color: Colors.accent
    }
})