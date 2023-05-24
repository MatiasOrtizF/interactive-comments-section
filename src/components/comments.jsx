import {  Text, View , Image, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import replyIcon from '../../assets/icons/reply-icon.js'
import minusIcon from '../../assets/icons/minus-icon';
import plusIcon from '../../assets/icons/plus-icon';
import styles from './styled';
import Replies from './Replies';
import imageProfile from './image-profile.js'

export default function Comments(comment) {

    return (
        <>
            <View style={styles.box}>
                <View style={{flexDirection:"row" , alignItems:"center"}}>
                    <Image style={{width:40 , height:40}} source={imageProfile[comment.user.username]}/>
                    <Text style={{marginHorizontal:10, fontWeight:"700"}}>{comment.user.username}</Text>
                    <Text>{comment.createdAt}</Text>
                </View>
                <Text style={{marginVertical:10}}>{comment.content}</Text>
                <View style={{flexDirection:"row" , alignItems:"center", justifyContent:"space-between"}}>
                    <View style={styles.score}>
                        <TouchableOpacity>
                            <SvgXml xml={plusIcon} width={10} height={13}></SvgXml>
                        </TouchableOpacity>                                
                            <Text style={{color:"blue", marginHorizontal:5}}>{comment.score}</Text>
                        <TouchableOpacity>
                            <SvgXml xml={minusIcon} width={10} height={3}></SvgXml>
                        </TouchableOpacity>
                    </View>
                        <TouchableOpacity style={{flexDirection:"row", alignItems:"center"}}>
                            <SvgXml xml={replyIcon} width={13} height={13}></SvgXml>
                            <Text style={{marginLeft:5, color:"blue"}}>Replay</Text>
                        </TouchableOpacity>
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