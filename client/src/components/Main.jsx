import { StatusBar } from 'expo-status-bar';
import { FlatList, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator, Button, SafeAreaView, Platform } from 'react-native';
import Constants from 'expo-constants';
// import commentsData from '../data/data.json'
import styles from './Styles';
import Comments from './Comments.jsx'
import imageProfile from './image-profile.js'
import { useState } from 'react';
import { useComments } from '../hooks/commentsContext';

import { SvgXml } from 'react-native-svg';
import minusIcon from '../../assets/icons/minus-icon';
import plusIcon from '../../assets/icons/plus-icon';

import replyIcon from '../../assets/icons/reply-icon.js'

export default function Main() {
    const {addComment, commentsData, dataloaded, userData, textInputRef, addReplyActived, backToComment, replyComentary} = useComments();
    const [input , setInput] = useState("");

    return (
        <>
            {dataloaded ?
                <SafeAreaView style={{flex:1, backgroundColor:"#C9D8EA" }}>
                    <View style={{marginTop: Platform.OS == "android" && Constants.statusBarHeight, flex:1, alignItems:"center"}}>
                        <StatusBar style="auto"/>
                        <FlatList
                            data={commentsData}
                            keyExtractor={item=>item.id}
                            renderItem={({item: comment}) => (
                                <Comments {...comment}/>
                            )}
                        />  

                        <View style={styles.boxComment}>
                            {addReplyActived ? 
                                <TouchableOpacity onPress={backToComment}>
                                    <Image source={require("../../assets/icons/back-icon.png")}/>
                                </TouchableOpacity>
                                :
                                <Image style={{width:40 , height:40}} source={imageProfile[userData.username]} />
                            }
                            <View style={{flexDirection:"row", width:"60%"}}>

                                {addReplyActived ? 
                                        <TextInput 
                                            style={{color:"black"}}
                                            multiline
                                            ref={textInputRef} 
                                            placeholder='Add a reply...'
                                            onChangeText={setInput}
                                        />
                                    :
                                        <TextInput
                                            style={{color:"black"}}
                                            multiline
                                            placeholder='Add a comment...'
                                            onChangeText={setInput}
                                        ></TextInput> 

                                }
                            </View>

                            {addReplyActived ?
                                <TouchableOpacity style={styles.send} onPress={() => replyComentary(input)}>
                                    <Text style={{color:"blue", alignSelf:"flex-end", fontWeight:"700", fontSize:16}}>Send</Text>
                                </TouchableOpacity>
                            :
                                <TouchableOpacity style={styles.send} onPress={() => addComment(input)}>
                                    <Text style={{color:"blue", alignSelf:"flex-end", fontWeight:"700", fontSize:16}}>Send</Text>
                                </TouchableOpacity>
                            }
                        </View>

                    </View>
                </SafeAreaView>
                :

                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <ActivityIndicator size="large" color="#C9D8EA"/>
                </View>
            }
        </>
    );
}