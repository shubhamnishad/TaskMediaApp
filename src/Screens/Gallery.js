import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {GlobalContext} from '../context/context';

export default function Gallery() {
  const {photos, removePhoto} = useContext(GlobalContext);

  return (
    <View style={styles.MainContainer}>
      {photos.length > 0 ? (
        <FlatList
          data={photos}
          renderItem={({item, index}) => (
            <>
              <View style={styles.GridViewBlockStyle}>
                <View
                  style={{
                    flex: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#CCCCCC',
                  }}>
                  <Image
                    source={{
                      uri: item.uri,
                    }}
                    style={styles.imageBox}
                    resizeMode="stretch"
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    flex: 1.5,
                    alignItems: 'center',
                    backgroundColor: '#DCE8F9',
                    alignContent: 'center',
                  }}>
                  <TouchableOpacity onPress={() => removePhoto(index)}>
                    <View
                      style={{
                        backgroundColor: '#ff8c00',
                        width: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                      }}>
                      <Text style={styles.commonText}>Delete</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
          numColumns={2}
        />
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: 'aerial', fontSize: 25}}>Empty</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  GridViewBlockStyle: {
    flex: 1,
    maxWidth: '49%',
    height: 200,
    margin: 2,
    borderWidth: 1,
    borderColor: 'black',
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
  },
  commonText: {
    fontFamily: 'aerial',
    color: 'white',
  },
  imageBox: {
    width: '100%',
    height: '100%',
  },
});
