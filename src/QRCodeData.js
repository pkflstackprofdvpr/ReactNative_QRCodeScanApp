import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View, Button, FlatList, ScrollView } from "react-native";

export default class QRCodeData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            qrCodeData: " ", 
            scanner: undefined, 
            json_data: [],
            isLoading: true
        };
    }

    componentDidMount() {
        //The code bellow will receive the props passed by QRCodeScannerScreen

        const qrCodeData = this.props.navigation.getParam("data", "No data read");
        const scanner = this.props.navigation.getParam("scanner", () => false);

        this.setState({ qrCodeData: qrCodeData, scanner: scanner});

        if(qrCodeData.startsWith("http"))
        {
            // fetch("http://199.188.204.125/api/esnbcsubsets_for_mobile/1")
            // console.log(qrCodeData);
            fetch(qrCodeData)
            .then(response => response.json())
            .then((responseJson) => {
                //Success 
                // alert(JSON.stringify(responseJson));
                console.log(responseJson);
                this.setState({ json_data: responseJson.data});
            })
            //If response is not in json then in error
            .catch((error) => {
                //Error 
                // alert(JSON.stringify(error));
                console.error(error);
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    
            // .then(data => {
            //     alert(JSON.stringify(data));
    
            //     // this.setState({ json_data: data.data });
            // });    
        }
    }

    scanQRCodeAgain() {
        this.state.scanner.reactivate();
        this.props.navigation.goBack();
    }
    // http://199.188.204.125/api/esnbcsubsets_for_mobile/
    render() {
        // const searchResults = Object.keys(this.state.json_data).map(key =>
        //     <item key={key} value={key}>{this.state.results[key]}</item>
        //   )
        const {json_data, isLoading} = this.state;

        var results = [];
        // var iterateData =function(data){   for (var key in data) {

        //     for(var key2 in data[key]) {
        //         console.log(key2 + ":   " + data[key][key2]);
        //         value = data[key][key2];
        //         if(value == null)
        //         {
        //             value = "";
        //         }
        //         results.push({ key: key2, value: value});
        //     }
        // }};
        var iterateData =function(data){ 
            for(var key in data) {
                console.log(key + ":   " + data[key]);
                value = data[key];
                if(value == null)
                {
                    value = "";
                }
                results.push({ key: key, value: value});
            }
        };

        if(!isLoading)
        {
            iterateData(json_data); // write 1 and 2 to the console
        }

        return (
        <View style={styles.main}>
            <View style={styles.container}>
                {isLoading ? <ActivityIndicator/> : (<>
                    <Button title={"Scan QRCode Again"} style={styles.btn} onPress={() => this.scanQRCodeAgain()} />
                    <Button title={"Home"} style={styles.btn} onPress={() => this.props.navigation.popToTop()}/>
                    {/* <FlatList data={results} renderItem={({item}) => <Text style={styles.item}>{item.key}: {item.value}</Text>}/> */}
                    <ScrollView>
                    {
                        results.map((item, index) => (
                            <View key = {item.key} style = {styles.item}>
                                <Text style = {styles.text_key}>{item.key}: </Text>
                                <Text style = {styles.text_value}>{item.value}</Text>
                            </View>
                        ))
                    }
                    </ScrollView>
                </>)}
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        width: '100%',
        marginBottom: 10,
        color: '#ff0000',
        fontSize: 20,
    },
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        paddingTop: 0,
        // width: '100%'
    },
    text_key: {
        fontSize: 17,
        textAlign: "center",
        margin: 10,
        fontStyle: "italic"
    },
    text_value: {
        fontSize: 17,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },    
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 5,
        borderColor: '#2a4944',
        borderWidth: 0,
        backgroundColor: '#fff',
        fontSize: 10,
        fontWeight: 'bold'
    },
     main: {
         flex: 1,
     }
});