import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    box: {
        backgroundColor:"white",
        margin: 10,
        padding: 15,
        borderRadius: 7
    },
    boxReplie: {
        backgroundColor:"white",
        marginVertical:10,
        marginRight: 10,
        marginLeft: 25,
        padding: 15,
        borderRadius: 7
    },
    boxComment: {
        width: "100%",
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor: "#8CB6E9",
        padding: 15,
    },
    score: {
        backgroundColor:"#E5EBF1", 
        flexDirection:"row", 
        alignItems:"center", 
        padding:7,
        borderRadius:7
    }
});

export default styles;