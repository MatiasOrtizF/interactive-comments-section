import { StatusBar } from 'expo-status-bar';
import { FlatList , Text, View , Image, TouchableOpacity, TextInput } from 'react-native';
import Constants from 'expo-constants';
import commentsData from '../data/data.json'
import styles from './styled';
import Comments from './comments.jsx'
import imageProfile from './image-profile.js'
import { useState } from 'react';

export default function Main() {

    return (
        <View style={{marginTop:Constants.statusBarHeight , backgroundColor:"#C9D8EA" , flex:1, alignItems:"center"}}>
            <StatusBar style="auto"/>
            <FlatList
                data={commentsData.comments}
                keyExtractor={item=>item.id}
                renderItem={({item: comment}) => (
                    <Comments {...comment}/>
                )}
            />
            <View style={styles.boxComment}>
                <Image style={{width:40 , height:40}} source={imageProfile[commentsData.currentUser.username]} />
                <View style={{flexDirection:"row", width:"60%"}}>
                    <TextInput
                    style={{color:"black"}}
                        multiline
                        placeholder='Add a comment...'
                    ></TextInput>
                </View>
                <TouchableOpacity style={{width:"20%", alignSelf:"flex-end" , paddingHorizontal:10, paddingVertical:5, borderRadius:7}}>
                    <Text style={{color:"blue", alignSelf:"flex-end", fontWeight:"700", fontSize:16}}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}