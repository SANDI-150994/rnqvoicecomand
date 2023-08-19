import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';

type Props = {};
type State = {
  pitch: string;
  error: string;
  end: string;
  started: string;
  results: string[];
  isStatusLight: string;
};

class App extends Component<Props, State> {
  state = {
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    isStatusLight: '',
  };

  constructor(props: Props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    });
  };

  onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });
    e.value.map((result, index) => {
      if (result.toLowerCase() === 'persegi') {
        this.setState({
          isStatusLight: 'persegi',
        });
      }
      if (result.toLowerCase() === 'persegi panjang') {
        this.setState({
          isStatusLight: 'persegi panjang',
        });
      }
      if (result.toLowerCase() === 'lingkaran') {
        this.setState({
          isStatusLight: 'lingkaran',
        });
      }
      if (result.toLowerCase() === 'belah ketupat') {
        this.setState({
          isStatusLight: 'belah ketupat',
        });
      }
      if (result.toLowerCase() === 'layang layang') {
        this.setState({
          isStatusLight: 'layang layang',
        });
      }
      if (result.toLowerCase() === 'jajar genjang') {
        this.setState({
          isStatusLight: 'jajar genjang',
        });
      }
      if (result.toLowerCase() === 'segitiga') {
        this.setState({
          isStatusLight: 'segitiga',
        });
      }
      if (result.toLowerCase() === 'trapesium') {
        this.setState({
          isStatusLight: 'trapesium',
        });
      }
      // if (result.toLowerCase() === 'nyalakan doni') {
      //   this.setState({
      //     isStatusLight: 'nyalakan doni',
      //   });
      // }
      if (result.toLowerCase() === 'off') {
        this.setState({
          isStatusLight: 'off',
        });
      }
    });
  };

  onSpeechVolumeChanged = (e: any) => {
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      pitch: '',
      error: '',
      started: '',
      results: [],
      end: '',
    });

    try {
      await Voice.start('id-ID');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      pitch: '',
      error: '',
      started: '',
      results: [],
      end: '',
      isStatusLight: '',
    });
  };

  render() {
    let statusLight
    if (this.state.isStatusLight === "persegi") {
      statusLight = <Image style={styles.light} source={require('./src/persegi_kuning.png')} />
    } else if (this.state.isStatusLight === "persegi panjang") {
      statusLight = <Image style={StyleSheet.light} source={require('./src/persegipjg_trsnprn.png')} />
    } else if (this.state.isStatusLight === "segitiga") {
      statusLight = <Image style={StyleSheet.light} source={require('./src/segitiga_hitam.png')} />
    } else if (this.state.isStatusLight === "belah ketupat") {
      statusLight = <Image style={StyleSheet.light} source={require('./src/belahketupat_orange.png')} />
    } else if (this.state.isStatusLight === "jajar genjang") {
      statusLight = <Image style={StyleSheet.light} source={require('./src/jajargenjang_hijau.png')} />
    } else if (this.state.isStatusLight === "layang layang") {
      statusLight = <Image style={StyleSheet.light} source={require('./src/layang2_pink.png')} />
    } else if (this.state.isStatusLight === "trapesium") {
      statusLight = <Image style={StyleSheet.light} source={require('./src/trapesium_gred.png')} />
    } else if (this.state.isStatusLight === "lingkaran") {
      statusLight = <Image style={StyleSheet.light} source={require('./src/lingkaran_red.png')} />
    } else {
      statusLight = <Image style={styles.light} source={require('./src/light_off.png')} />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>React Native Voice Command</Text>
        <Text style={styles.instructions}>
          Tekan tombol dan mulai bersuara.
        </Text>
        <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
        <Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>
        <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>
        <Text style={styles.stat}>Results:</Text>
        {this.state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>{`End: ${this.state.end}`}</Text>
        <TouchableHighlight onPress={this._startRecognizing}>
          <Image style={styles.button} source={require('./src/button.png')} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this._stopRecognizing}>
          <Text style={styles.action}>Stop Recognizing</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing}>
          <Text style={styles.action}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer}>
          <Text style={styles.action}>Destroy</Text>
        </TouchableHighlight>
        {statusLight}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
  light: {
    marginTop: 50,
    width: 200,
  },
});

export default App;