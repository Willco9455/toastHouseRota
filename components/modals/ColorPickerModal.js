import { Button, Modal, View } from "react-native";
import ColorPicker from 'react-native-wheel-color-picker'

let currentColor =  '#16fe03'
export function ColorPickerModal({ vivible, setColor }) {

  return (
    <Modal visible={vivible}>
      <View style={[{ flex: 4, padding: 50, }]}>
        <ColorPicker
          color={currentColor}
          onColorChange={(color) => currentColor = color}
          thumbSize={50}
          discrete={false}
          sliderSize={40}
          noSnap={true}
          gapSize={10}
          row={false}
          swatches={true}
          shadeSliderThumb={true}
          swatchesHitSlop={10}
        />
      </View>
      <View style={{alignItems: 'center', marginBottom: 60}}>
        <Button onPress={() => setColor(currentColor)} title="Done" />
      </View>
    </Modal>
  );
}