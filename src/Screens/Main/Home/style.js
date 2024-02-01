import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../util/index';

const createStyles = theme => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.defaultColor,
    },

    mainContainerBtn: {
      flex: 1,
      flexDirection: 'row',
      width: wp(100),
      justifyContent: 'space-evenly',
      alignItems: 'flex-end',
      marginBottom: hp(5),
    },
    containerText: {
      alignItems: 'center',
      marginTop: wp(10),
    },
    containerIcon: {
      padding: wp(5),
    },
    containerBtn: {
      backgroundColor: theme.color.buttonColor,
      width: wp(30),
      height: hp(7),
      borderRadius: theme.borders.radius1,
      justifyContent: 'center',
      elevation: 5,
    },
    containerBtnSos: {
      backgroundColor: theme.color.buttonColor,
      width: wp(20),
      height: hp(7),
      borderRadius: theme.borders.radius1,
      justifyContent: 'center',
      elevation: 5,
    },
    btnText: {
      alignSelf: 'center',
      color: theme.color.primaryColor,
      fontSize: theme.size.small + 2,
      fontFamily: theme.family.medium,
    },
    containerSlider: {
      width: wp(90),
      alignSelf: 'center',
      marginTop: hp(70),
    },
    containerSosSlider: {
      width: wp(90),
      alignSelf: 'center',
      marginTop: hp(20),
    },
    headingText: {
      fontSize: theme.size.large,
      fontFamily: theme.family.bold,
      color: theme.color.primaryColor,
      marginTop: wp(8),
      width: wp(80),
      textAlign: 'center',
    },
    sliderStyle: {
      height: hp(8),
    },
    image: {
      height: hp(30),
      width: hp(30),
      borderRadius: theme.borders.radius6,
    },
    backgroundImage: {
      height: hp(100),
      width: wp(100),
    },
  });
  return styles;
};
export default createStyles;
