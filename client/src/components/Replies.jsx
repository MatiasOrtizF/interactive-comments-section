import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import replyIcon from '../../assets/icons/reply-icon.js'
import minusIcon from '../../assets/icons/minus-icon';
import plusIcon from '../../assets/icons/plus-icon';
import deleteIcon from '../../assets/icons/delete-icon.js';
import editIcon from '../../assets/icons/edit-icon.js';
import styles from './Styles.jsx';
import imageProfile from './image-profile.js'
import { useComments } from '../hooks/commentsContext';

export default function Replies(replie) {
    const {commentsData,deleteComentarry , deleteReplie , editComentarry,replyComentary, userData , plusReply , minusReply , handleButtonReplayPress} = useComments();

    const replicar = () => {
        console.log(replicar)
    }

    return (
        <View style={styles.boxReplie}   key={replie.id}>
        <View style={{flexDirection:"row" , alignItems:"center"}}>
            <Image style={{width:40 , height:40}} source={imageProfile[replie.user.username]}/>
            <Text style={{marginHorizontal:10, fontWeight:"700"}}>{replie.user.username}</Text>
            {replie.user.username == userData.username ?
                <Text style={{backgroundColor:"blue", color:"white", paddingHorizontal:5, marginRight:10}}>you</Text>
                :
                null
            }
            <Text>{replie.createdAt}</Text>
        </View>
        <View style={{marginVertical:10}}>
            <Text style={{color:"blue"}}>{"@" + replie.replyingTo}</Text>
            <Text>{replie.content}</Text>
        </View>
        <View style={{flexDirection:"row" , alignItems:"center", justifyContent:"space-between"}}>
        <View style={[styles.score, replie.like && styles.scoreActive]}>
            <TouchableOpacity onPress={()=>plusReply(replie.id)}>
                <SvgXml xml={plusIcon} width={10} height={13}></SvgXml>
            </TouchableOpacity>                                
                <Text style={{color:"blue", marginHorizontal:5}}>{replie.score}</Text>
            <TouchableOpacity onPress={()=>minusReply(replie.id)}>
                <SvgXml xml={minusIcon} width={10} height={3}></SvgXml>
            </TouchableOpacity>
        </View>
        {replie.user.username == userData.username ?
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={{flexDirection:"row", alignItems:"center"}} onPress={()=>deleteReplie(replie.id)}>
                    <SvgXml xml={deleteIcon} width={13} height={13}></SvgXml>
                    <Text style={{color:"red", marginRight:10}}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:"row", alignItems:"center"}} onPress={editComentarry}>
                    <SvgXml xml={editIcon} width={13} height={13}></SvgXml>
                    <Text style={{color:"blue"}}>Edit</Text>
                </TouchableOpacity>
            </View>
            :
            <TouchableOpacity style={{flexDirection:"row", alignItems:"center"}} onPress={() =>handleButtonReplayPress(replie.id)}>
                <SvgXml xml={replyIcon} width={13} height={13}></SvgXml>
                <Text style={{marginLeft:5, color:"blue"}}>Replay</Text>
            </TouchableOpacity>
        }
        </View>
    </View>
    );
}