import { MotiView } from 'moti';
import React, { memo, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
const { width } = Dimensions.get('screen')
export default function () {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <DigitalClock />
            <AnologClock />
            <AnalogText />
        </ScrollView>
    );
}
const DigitalClock = memo(() => {
    const [hours, setHours] = useState<string>('00');
    const [minut, setMinut] = useState<string>('00');
    const [sec, setSec] = useState<string>('00');
    useEffect(() => {
        const getTime = setInterval(() => {
            const newData = new Date();
            const newHours = newData.getHours();
            const newMints = newData.getMinutes();
            const newSec = newData.getSeconds();
            console.log('getTime');
            if (newHours.toString() !== hours) {
                setHours(newHours.toString());
            }
            if (newMints.toString() !== minut) {
                setMinut(newMints.toString());
            }
            if (newSec.toString() !== sec) {
                setSec(newSec.toString());
            }
        }, 1000);
        return () => clearInterval(getTime);
    }, []);

    return (
        <View style={styles.clockMain}>
            <HoursBlock time={hours} type="hour" />
            <HoursBlock time={minut} type="mint" />
            <HoursBlock time={sec} type="sec" />
        </View>
    );
});

const HoursBlock = memo(({ time, type }: { time: string; type: string }) => (
    <View style={styles.clockBlock}>
        <Text style={styles.clockText}>{time}</Text>
    </View>
));

const AnologClock = memo(() => {
    const [hours, setHours] = useState<number>(new Date().getHours());
    const [minut, setMinut] = useState<number>(new Date().getMinutes());
    const [sec, setSec] = useState<number>(new Date().getSeconds());
    useEffect(() => {
        const getTime = setInterval(() => {
            const newData = new Date();
            const newHours = newData.getHours();
            const newMints = newData.getMinutes();
            const newSec = newData.getSeconds();
            // console.log('getTime');
            if (newHours !== hours) {
                setHours(newHours);
            }
            if (newMints !== minut) {
                setMinut(newMints);
            }
            if (newSec !== sec) {
                setSec(newSec);
            }
        }, 1000);
        return () => clearInterval(getTime);
    }, []);

    let size = 180
    const hour = hours > 12 ? hours - 12 : hours;
    const minutes = minut / 5;
    const seconds = sec > 60 ? sec - 60 : sec;


    var lanHour = size / 6;
    var lanMinutes = size / 3.75;
    var lanSeconds = size / 3.75;
    return <View style={{
        alignItems: 'center',
        paddingVertical: 20

    }} >
        <View
            style={{
                borderWidth: 1,
                borderRadius: size / 2,
                justifyContent: 'center',
                alignItems: 'center',
                height: size,
                width: size,
            }}>
            {[...Array(12).keys()].map((i) => {
                let a = -60 + 30 * i;
                let b = 60 - 30 * i;
                return (
                    <View
                        style={{
                            position: 'absolute',
                            transform: [
                                { rotate: a + 'deg' },
                                { translateX: size / 2 - 15 },
                            ],
                        }}>
                        <Text
                            style={{
                                color: "#000",
                                fontSize: size / 9,
                                fontWeight: 'bold',
                                transform: [{ rotate: b + 'deg' }],
                            }}>
                            {i + 1}
                        </Text>
                    </View>
                );
            })}
            <View
                style={{
                    zIndex: 1,
                    width: 6,
                    height: 6,
                    borderWidth: 2,
                    borderRadius: 4,
                    borderColor: "#000",
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    width: lanHour,
                    height: 4,
                    borderRadius: 4,
                    backgroundColor: "#000",
                    transform: [
                        { rotate: -90 + (hour + (minutes / 12)) * 30 + 'deg' },
                        { translateX: lanHour / 2 },
                    ],
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    width: lanMinutes,
                    height: 3,
                    borderRadius: 4,
                    backgroundColor: "#212121",
                    transform: [
                        { rotate: -90 + minutes * 30 + 'deg' },
                        { translateX: lanMinutes / 2 },
                    ],
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    width: lanSeconds,
                    height: 2,
                    borderRadius: 4,
                    backgroundColor: "grey",
                    transform: [
                        { rotate: -90 + seconds * 6 + 'deg' },
                        { translateX: lanSeconds / 2 },
                    ],
                }}
            />
        </View>
    </View>
})
const AnalogText = () => {
    const [hours, setHours] = useState<number>(new Date().getHours());
    const [minut, setMinut] = useState<number>(new Date().getMinutes());
    const [sec, setSec] = useState<number>(new Date().getSeconds());
    useEffect(() => {
        const getTime = setInterval(() => {
            const newData = new Date();
            const newHours = newData.getHours();
            const newMints = newData.getMinutes();
            const newSec = newData.getSeconds();
            // console.log('getTime');
            if (newHours !== hours) {
                setHours(newHours);
            }
            if (newMints !== minut) {
                setMinut(newMints);
            }
            if (newSec !== sec) {
                setSec(newSec);
            }
        }, 1000);
        return () => clearInterval(getTime);
    }, []);

    let size = width * 0.9
    const hour = hours > 12 ? hours - 12 : hours;
    const minutes = minut / 5;
    const seconds = sec > 60 ? sec - 60 : sec;


    var lanHour = size / 5;
    var lanMinutes = size / 3.5;
    var lanSeconds = size / 2.5;
    console.log(minutes, minut)
    return <View style={{
        alignItems: 'center',
        paddingVertical: 20

    }} >
        <View
            style={{
                borderWidth: 1,
                borderRadius: size / 2,
                justifyContent: 'center',
                alignItems: 'center',
                height: size,
                width: size,
            }}>

            <View
                style={{
                    zIndex: 1,
                    width: 6,
                    height: 6,
                    borderWidth: 2,
                    borderRadius: 4,
                    borderColor: "#000",
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    transform: [
                        { rotate: -90 + (hour + (minutes / 12)) * 30 + 'deg' },
                        { translateX: lanHour / 2 },
                    ],
                }}
            >
                <Text numberOfLines={1} style={{
                    width: lanHour,
                    color: "#000", fontSize: 14,
                    transform: [{ rotate: hour >= 6 ? '180deg' : '0deg' }]
                }}>
                    {[...Array(hour >= 10 ? 4 : 8).keys()].map(() => hour).join("")}
                </Text>

            </View>
            <View
                style={{
                    position: 'absolute',
                    transform: [
                        { rotate: -90 + minutes * 6 + 'deg' },
                        { translateX: lanMinutes / 2 },
                    ],
                }}
            >
                <Text numberOfLines={1} style={{
                    width: lanMinutes,
                    color: "#000", fontSize: 14,
                    transform: [{ rotate: minut >= 30 ? '180deg' : '0deg' }]
                }}>
                    {[...Array(minut >= 10 ? 6 : 12).keys()].map(() => minut).join("")}
                </Text>

            </View>
            <View
                style={{
                    position: 'absolute',
                    transform: [
                        { rotate: -90 + seconds * 6 + 'deg' },
                        { translateX: lanSeconds / 2 },
                    ],
                }}
            >
                <Text numberOfLines={1} style={{
                    width: lanSeconds,
                    color: "#000", fontSize: 14,
                    transform: [{ rotate: seconds >= 30 ? '180deg' : '0deg' }]
                }}>
                    {[...Array(sec >= 10 ? 8 : 16).keys()].map(() => sec).join("")}
                </Text>

            </View>
        </View>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        paddingTop: (StatusBar.currentHeight ? StatusBar.currentHeight : 0) + 10,
    },

    clockMain: {
        flexDirection: 'row',
        borderWidth: 2,
        borderCurve: 'circular',
        elevation: 1,
        backgroundColor: '#fff',
        // shadowColor: '#000',
        margin: 10,
        padding: 10,
        borderColor: '#eeeeee',
        borderRadius: 10,
        gap: 10,
    },
    clockBlock: {
        flex: 1,
        backgroundColor: '#eeeeee',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    clockText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#212121',
    },

});
