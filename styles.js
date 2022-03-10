import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 0
    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        marginBottom: 5,

    },
    listTask: {
        width: 220,
        height: 50,
        padding: 5
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        width: 300,
        height: 50,
        borderRadius: 5,
        padding: 5,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 30,
        marginRight: 30
    },
    button: {
        backgroundColor: '#590de5',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    dltBtn: {
        width: 50,
        height: 50,
        padding: 10
    },
    footerView: {
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 50,
        borderTopWidth: 1,
        borderTopColor: 'grey'
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    },
    toggle: {
        paddingLeft: 16,
        paddingRight: 16,
        width: 100
    },
    bar: {
        paddingTop: 40,
        height: 80
    },
    barText: {
        color: 'white', 
        fontSize: 20
    },
    subtext: {
        fontWeight: 'bold',
        width: 50,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
})