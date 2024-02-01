import {
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Text from '../../../Components/CustomText';
import {useThemeAwareObject} from '../../../theme';
import createStyles from './style';
import Torch from 'react-native-torch';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Entypo';
import DeviceBrightness from '@adrianso/react-native-device-brightness';
import {colors} from '../../../constants';
function Home() {
  const styles = useThemeAwareObject(createStyles);
  const [torch, setTorch] = useState(false);
  const [showBrightness, setShowBrightness] = useState(false);
  const [brightness, setBrightness] = useState(0);
  const [sosTorch, setSosTorch] = useState(false);
  const [torchActive, setTorchActive] = useState(false);
  const [toggleInterval, setToggleInterval] = useState(1000);

  useEffect(() => {
    const handleBackButton = () => {
      if (showBrightness) {
        setShowBrightness(false);
        setBrightness(defaultBright);
        return true; // Do not exit the app
      }
      return false; // Allow the app to exit
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => {
      backHandler.remove();
    };
  }, [showBrightness]);
  useEffect(() => {
    if (sosTorch) {
      const intervalId = setInterval(() => {
        setTorchActive(prevTorchActive => !prevTorchActive);
      }, Math.abs(1100 - parseInt(toggleInterval)));

      return () => {
        clearInterval(intervalId);
        Torch.switchState(false);
      };
    }
  }, [sosTorch, toggleInterval]);

  useEffect(() => {
    Torch.switchState(torchActive);
  }, [torchActive]);

  const handleTorch = () => {
    Torch.switchState(!torch);
    setTorch(!torch);
  };

  useEffect(() => {
    fetchDefaultBrightness();
  }, []);

  async function fetchDefaultBrightness() {
    try {
      const currentBrightness =
        await DeviceBrightness.getSystemBrightnessLevel();
      DeviceBrightness.setBrightnessLevel(currentBrightness);
    } catch (error) {
      console.error('Error fetching default brightness:', error);
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={60}
        style={styles.backgroundImage}
        imageStyle={{
          tintColor: showBrightness ? colors.white : undefined,
        }}
        source={require('../../../../assets/images/wallpaper.jpg')}>
        {showBrightness && (
          <View style={styles.containerIcon}>
            <TouchableOpacity
              onPress={() => {
                setShowBrightness(false);
                fetchDefaultBrightness();
              }}>
              <Icon name="circle-with-cross" size={25} style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
        {showBrightness == false && (
          <View style={styles.containerText}>
            <Image
              style={styles.image}
              source={require('../../../../assets/images/Flashlight.png')}
            />
            <Text style={styles.headingText}>
              Torch, SOS, or Front brightness controls at your fingertips!
            </Text>
          </View>
        )}
        {sosTorch && (
          <View style={styles.containerSosSlider}>
            <Slider
              style={styles.sliderStyle}
              value={toggleInterval}
              minimumValue={100}
              maximumValue={1000}
              step={1}
              minimumTrackTintColor={colors.blue}
              maximumTrackTintColor={colors.lightGray}
              thumbTintColor={colors.blue}
              onValueChange={interval => {
                setToggleInterval(interval);
              }}
            />
          </View>
        )}
        {showBrightness ? (
          <View style={styles.containerSlider}>
            <Slider
              style={styles.sliderStyle}
              value={brightness}
              maximumValue={1}
              minimumValue={0.01}
              step={0.1}
              minimumTrackTintColor={colors.blue}
              maximumTrackTintColor={colors.lightGray}
              thumbTintColor={colors.blue}
              onValueChange={brightness => {
                DeviceBrightness.setBrightnessLevel(brightness);
              }}
            />
          </View>
        ) : (
          <View style={styles.mainContainerBtn}>
            <TouchableOpacity
              disabled={sosTorch}
              onPress={() => {
                handleTorch();
              }}
              style={[
                styles.containerBtn,
                {
                  backgroundColor: sosTorch ? colors.darkGray : colors.blue,
                },
              ]}>
              <Text style={styles.btnText}>Back Torch</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={torch}
              onPress={() => setSosTorch(!sosTorch)}
              style={[
                styles.containerBtnSos,
                {
                  backgroundColor: torch ? colors.darkGray : colors.blue,
                },
              ]}>
              <Text style={styles.btnText}>SOS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={sosTorch || torch}
              onPress={() => {
                setShowBrightness(true);
                DeviceBrightness.setBrightnessLevel(1);
                setToggleInterval(1000);
                setBrightness(1);
              }}
              style={[
                styles.containerBtn,
                {
                  backgroundColor:
                    sosTorch || torch ? colors.darkGray : colors.blue,
                },
              ]}>
              <Text style={styles.btnText}>Front Torch</Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

export default Home;
