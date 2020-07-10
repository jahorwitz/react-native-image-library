import React, { useCallback } from 'react';
import {
  FlatList,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';

// Helpers
import { getRelativeDateDisplay } from '../../helpers/dateHelper';

// Styles
import styles from './__style';

const ImageGallery = ({
  data,
  showSelectionBanner,
  dateComponent,
  gridViewComponent,
  selectionBannerComponent,
  emptyGalleryComponent,
  galleryContainerStyle,
  dateTextStyle
}) => {

  // A stream is a series of photos within a single day
  const renderPhotoStream = useCallback(({ item: stream, index }) => {
    return (
      <View key={index}>
        {dateComponent ? dateComponent(stream.date) : (
          <Text style={{...styles.dateText, ...dateTextStyle}}>
            {getRelativeDateDisplay(stream.date)}
          </Text>
        )}
        {gridViewComponent(stream)}
      </View>
    )
  }, []);

  return (
    <View style={{...styles.container, ...galleryContainerStyle}}>
      {data.length > 0 ? (
        <>
          {showSelectionBanner && selectionBannerComponent}
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={renderPhotoStream}
            numColumns={1}
          />
          {children}
        </>
      ) : emptyGalleryComponent}
    </View>
  );
}

ImageGallery.propTypes = {
  data: PropTypes.array.isRequired,
  showSelectionBanner: PropTypes.bool,
  dateComponent: PropTypes.func,
  gridViewComponent: PropTypes.func.isRequired,
  selectionBannerComponent: PropTypes.object,
  emptyGalleryComponent: PropTypes.object,
  galleryContainerStyle: PropTypes.object,
  dateTextStyle: PropTypes.object
}

export default ImageGallery;