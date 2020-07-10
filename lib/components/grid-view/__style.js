import { StyleSheet } from 'react-native';

const styles = {
    listContainer: {
        flex: 1
    },
    listColumn: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    itemInvisible: {
        flex: 1,
        margin: 1,
        backgroundColor: 'transparent',
    },
    collapsibleViewContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    closeCollapsipleViewButton: {
        marginRight: 5
    }
};

export default StyleSheet.create(styles);