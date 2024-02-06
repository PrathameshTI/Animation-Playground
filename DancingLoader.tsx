// import {
//   Canvas,
//   Circle,
//   Group,
//   LinearGradient,
//   RoundedRect,
//   SharedValueType,
//   SweepGradient,
//   vec,
// } from '@shopify/react-native-skia';
// import React, {useEffect, useMemo} from 'react';
// import {Dimensions, View} from 'react-native';
// import {
//   Easing,
//   useDerivedValue,
//   useSharedValue,
//   withDelay,
//   withRepeat,
//   withTiming,
// } from 'react-native-reanimated';
// const {width, height} = Dimensions.get('screen');
// const HEI = height / 8;
// const WID = 25;
// const BoxWidth = width * 0.8;
// const thisArray = [...Array(7).keys()];
// export default function () {
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: '#000',
//         alignItems: 'center',
//       }}>
//       <Canvas
//         style={{
//           flex: 1,
//           width: BoxWidth,
//           backgroundColor: '#000',
//         }}>
//         <Group>
//           <ArrayGroup />
//           <LinearGradient
//             start={vec(0, 0)}
//             end={vec(BoxWidth, height)}
//             colors={['cyan', 'magenta', 'yellow', 'cyan']}
//           />
//         </Group>
//       </Canvas>
//     </View>
//   );
// }

// const ArrayGroup = () => {
//   const sv = useSharedValue(height / 2 - HEI / 2 + height * 0.05);

//   const svOne = useDerivedValue(
//     () =>
//       withRepeat(
//         withDelay(
//           200,

//           withTiming(height / 2 - HEI / 2 + height * 0.05 - height * 0.1, {
//             duration: 1000,
//             easing: Easing.linear,
//           }),
//         ),
//         -1,
//         true,
//       ),
//     [sv.value],
//   );

//   useEffect(() => {
//     sv.value = withRepeat(
//       withTiming(height / 2 - HEI / 2 + height * 0.05 - height * 0.1, {
//         duration: 1000,
//         easing: Easing.linear,
//       }),

//       -1,
//       true,
//     );
//   }, []);

//   //   return thisArray.map((_, index) => {
//   return (
//     <>
//       <AnimateBox key={0} idx={0} sv={sv} />
//       <AnimateBox key={1} idx={1} sv={svOne} />
//       <AnimateBox key={2} idx={2} sv={sv} />
//       <AnimateBox key={3} idx={3} sv={sv} />
//       <AnimateBox key={4} idx={4} sv={sv} />
//       <AnimateBox key={5} idx={5} sv={sv} />
//       <AnimateBox key={6} idx={6} sv={sv} />
//     </>
//   );
//   //   });
// };
// const AnimateBox = ({idx, sv}: {idx: number; sv: SharedValueType}) => {
//   return (
//     <>
//       <Circle
//         cx={(BoxWidth * idx) / 7 + BoxWidth / 14}
//         cy={height * 0.4}
//         r={WID / 2}
//       />
//       <RoundedRect
//         x={(BoxWidth * idx) / 7 + BoxWidth / 14 - WID / 2}
//         y={sv}
//         width={WID}
//         height={HEI}
//         r={WID}
//       />
//       <Circle
//         cx={(BoxWidth * idx) / 7 + BoxWidth / 14}
//         cy={height * 0.6}
//         r={WID / 2}
//       />
//     </>
//   );
// };

import MaskedView from '@react-native-masked-view/masked-view';
import {View} from 'moti';
import React from 'react';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('screen');
const loadArray = [0, 100, 200, 300, 200, 100, 0];

const mainWidth = width * 0.8;
const mainHeight = 150;

const smWidth = mainWidth * 0.06;
const smHeight = 80;
export default function () {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <MaskedView
        style={{
          height: mainHeight,
          width: mainWidth,
        }}
        maskElement={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              height: mainHeight,
              width: mainWidth,
            }}>
            {loadArray.map((delayTime, item) => (
              <View
                style={{
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: smWidth,
                    height: smWidth,
                    borderRadius: smWidth,
                    backgroundColor: '#ccc',
                  }}
                  from={{
                    scale: 1,
                  }}
                  animate={{
                    scale: 0,
                  }}
                  transition={{
                    type: 'timing',
                    duration: 1000,
                    loop: true,
                    delay: delayTime,
                  }}
                />
                <View
                  style={{
                    width: smWidth,
                    height: smHeight,
                    backgroundColor: '#ccc',
                    borderRadius: smWidth,
                  }}
                  from={{
                    translateY: -(mainHeight - smHeight) / 2,
                  }}
                  animate={{
                    translateY: (mainHeight - smHeight) / 2,
                  }}
                  transition={{
                    type: 'timing',
                    duration: 1000,
                    loop: true,
                    delay: delayTime,
                  }}
                />
                <View
                  style={{
                    width: smWidth,
                    height: smWidth,
                    borderRadius: smWidth,
                    backgroundColor: '#ccc',
                    alignSelf: 'flex-end',
                  }}
                  from={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    type: 'timing',
                    duration: 1000,
                    loop: true,
                    delay: delayTime,
                  }}
                />
              </View>
            ))}
          </View>
        }>
        <LinearGradient
          colors={['cyan', 'magenta', 'yellow', 'cyan']}
          angle={90}
          useAngle={true}
          style={{
            flex: 1,
          }}></LinearGradient>
      </MaskedView>
    </View>
  );
}
