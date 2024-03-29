import React, { useRef } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { SvgXml } from 'react-native-svg';
import replyIcon from '../../assets/icons/reply-icon.js'
import minusIcon from '../../assets/icons/minus-icon.js';
import plusIcon from '../../assets/icons/plus-icon.js';
import deleteIcon from '../../assets/icons/delete-icon.js';
import editIcon from '../../assets/icons/edit-icon.js';
import styles from './Styles.jsx';
import Replies from './Replies.jsx';
import imageProfile from './image-profile.js'
import { useComments } from '../hooks/commentsContext.js';
import { useState } from 'react';

export default function Comments(comment, keyExtractor) {
    const {deleteComentarry,editComentarry, commentsData, replyComentary , minus , plus , userData , handleButtonReplayPress} = useComments();

    return (
        <>
        <View style={styles.box}>
        <View style={{flexDirection:"row" , alignItems:"center"}}>
            <Image style={{width:40 , height:40}} source={imageProfile[comment.user.username]}/>
            <Text style={{marginHorizontal:10, fontWeight:"700"}}>{comment.user.username}</Text>
            {comment.user.username == userData.username ?
                <Text style={{backgroundColor:"blue", color:"white", paddingHorizontal:5, marginRight:10}}>you</Text>
                :
                null
            }
            <Text>{comment.createdAt}</Text>
        </View>
        <Text style={{marginVertical:10}}>{comment.content}</Text>
        <View style={{flexDirection:"row" , alignItems:"center", justifyContent:"space-between"}}>
            <View style={[styles.score, comment.like && styles.scoreActive]}>
                <TouchableOpacity onPress={()=>plus(comment.id)}>
                    <SvgXml xml={plusIcon} width={10} height={13}></SvgXml>
                </TouchableOpacity>                                
                    <Text style={{color:"blue", marginHorizontal:5}}>{comment.score}</Text>
                <TouchableOpacity onPress={()=>minus(comment.id)}>
                    <SvgXml xml={minusIcon} width={10} height={3}></SvgXml>
                </TouchableOpacity>
            </View>
            {comment.user.username == userData.username ?
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity style={{flexDirection:"row", alignItems:"center"}} onPress={()=>deleteComentarry(comment.id)}>
                        <SvgXml xml={deleteIcon} width={13} height={13}></SvgXml>
                        <Text style={{color:"red", marginRight:10}}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:"row", alignItems:"center"}} onPress={editComentarry}>
                        <SvgXml xml={editIcon} width={13} height={13}></SvgXml>
                        <Text style={{color:"blue"}}>Edit</Text>
                    </TouchableOpacity>
                </View>
                :
                <>
                    <TouchableOpacity style={{flexDirection:"row", alignItems:"center"}} onPress={() =>handleButtonReplayPress(comment.id)}>
                        <SvgXml xml={replyIcon} width={13} height={13}></SvgXml>
                        <Text style={{marginLeft:5, color:"blue"}}>Replay</Text>
                    </TouchableOpacity>
                </>
            }
        </View>
        </View>
                    <View>
                    {comment.replies.map((replie) => 
                        <Replies {...replie}
                        key={replie.id}
                        />
                    )}
                </View>
                </>
    );
}