import React, { useCallback } from 'react';
import {
    FlatList,
    View,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import deepEqual from 'deep-equal';

// Styles
import styles from './__style';

const GridView = ({
    data,
    renderItem,
    numColumns,
    keyExtractor,
    columnWrapperStyle,
    flatListProps,
    showCollapsibleView,
    collapsibleViewBaseItem,
    collapsibleViewContent,
    onCloseCollapsibleView,
    blankGridItemComponent,
    customSpaceFormattingFunc,
    customRenderGridItem,
    closeCollapsibleViewComponent,
    collapsibleViewComponent,
    collapsibleViewContentComponent,
    collapsibleViewComponentStyle,
    closeCollapsibleViewButtonStyle,
    closeCollapsibleViewIconProps
}) => {
    const formatBlankSpaces = useCallback(() => {
        let formattedData = [...data];
        let numberOfElementsLastRow = data.length % numColumns;

        for (let i = numberOfElementsLastRow; i > 0 && i < numColumns; i++) {
            formattedData.push({ blank: true });
        }

        if (showCollapsibleView) {
            const collapsibleBaseIndex = formattedData.findIndex(item => {
                return deepEqual(item === collapsibleViewBaseItem);
            });

            // Insert ${numColumns} blank spaces on the next row to leave room for the collapsible view
            for (let i = 0; i < numColumns - 1; i++) {
                formattedData.splice(collapsibleBaseIndex + (numColumns - (collapsibleBaseIndex % numColumns)), 0, { empty: true });
            }

            // Insert the collapsible view slot
            formattedData.splice(collapsibleBaseIndex + (numColumns - (collapsibleBaseIndex % numColumns)), 0, { collapsibleView: true });
        }

        return formattedData;
    }, [data, numColumns, showCollapsibleView, collapsibleViewBaseItem]);

    const renderGridItem = useCallback(({ item, index }) => {
        if (item.blank) {
            return blankGridItemComponent || <View style={styles.itemInvisible} />;
        } else if (item.empty) {
            return;
        } else if (item.collapsibleView) {
            if (collapsibleViewComponent) {
                return collapsibleViewComponent()
            } else {
                return (
                    <View style={{ ...styles.collapsibleViewContainer, ...collapsibleViewComponentStyle }}>
                        <TouchableOpacity style={{...styles.closeCollapsipleViewButton, closeCollapsibleViewButtonStyle}} onPress={onCloseCollapsibleView}>
                            {closeCollapsibleViewComponent ? closeCollapsibleViewComponent() : (
                                <Icon
                                    name="chevron-up"
                                    type="material-community"
                                    size={28}
                                    {...closeCollapsibleViewIconProps}
                                />
                            )}
                        </TouchableOpacity>
                        {collapsibleViewContentComponent ? collapsibleViewContentComponent(item) : collapsibleViewContent(item)}
                    </View>
                )
            }
        } else {
            return renderItem(item, index);
        }
    }, [renderItem, collapsibleViewContent]);

    return (
        <View style={styles.listContainer}>
            <FlatList
                columnWrapperStyle={{ ...styles.listColumn, ...columnWrapperStyle }}
                keyExtractor={keyExtractor ? keyExtractor : (item, index) => index.toString()}
                data={customSpaceFormattingFunc ? customSpaceFormattingFunc() : formatBlankSpaces()}
                renderItem={customRenderGridItem || renderGridItem}
                numColumns={numColumns}
                {...flatListProps}
            />
        </View>
    );
}

GridView.propTypes = {
    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    numColumns: PropTypes.number.isRequired,
    keyExtractor: PropTypes.func,
    columnWrapperStyle: PropTypes.object,
    showCollapsibleView: PropTypes.bool,
    collapsibleViewBaseItem: PropTypes.object,
    collapsibleViewContent: PropTypes.object,
    onCloseCollapsibleView: PropTypes.func,
    blankGridItemComponent: PropTypes.func,
    customSpaceFormattingFunc: PropTypes.func,
    customRenderGridItem: PropTypes.func,
    closeCollapsibleViewComponent: PropTypes.func,
    collapsibleViewComponent: PropTypes.func,
    collapsibleViewContentComponent: PropTypes.func,
    collapsibleViewComponentStyle: PropTypes.object,
    closeCollapsibleViewButtonStyle: PropTypes.object,
    closeCollapsibleViewIconProps: PropTypes.object
}

export default GridView;