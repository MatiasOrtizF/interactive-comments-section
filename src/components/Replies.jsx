import { Text, View , Image, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import replyIcon from '../../assets/icons/reply-icon.js'
import minusIcon from '../../assets/icons/minus-icon';
import plusIcon from '../../assets/icons/plus-icon';
import styles from './styled';
import imageProfile from './image-profile.js'

export default function Replies(replie) {

    const replicar = () => {
        console.log(replicar)
    }

    return (
            <View style={styles.boxReplie}>
                <View style={{flexDirection:"row" , alignItems:"center"}}>
                    <Image style={{width:40 , height:40}} source={imageProfile[replie.user.username]}/>
                    <Text style={{marginHorizontal:10, fontWeight:"700"}}>{replie.user.username}</Text>
                    <Text>{replie.createdAt}</Text>
                </View>
                <View style={{marginVertical:10}}>
                    <Text style={{color:"blue"}}>{"@" + replie.replyingTo}</Text>
                    <Text>{replie.content}</Text>
                </View>
                <View style={{flexDirection:"row" , alignItems:"center", justifyContent:"space-between"}}>
                <View style={styles.score}>
                    <TouchableOpacity>
                        <SvgXml xml={plusIcon} width={10} height={13}></SvgXml>
                    </TouchableOpacity>                                
                        <Text style={{color:"blue", marginHorizontal:5}}>{replie.score}</Text>
                    <TouchableOpacity>
                        <SvgXml xml={minusIcon} width={10} height={3}></SvgXml>
                    </TouchableOpacity>
                </View>
                    <TouchableOpacity style={{flexDirection:"row", alignItems:"center"}} onPress={replicar}>
                        <SvgXml xml={replyIcon} width={13} height={13}></SvgXml>
                        <Text style={{marginLeft:5, color:"blue"}}>Replay</Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
}