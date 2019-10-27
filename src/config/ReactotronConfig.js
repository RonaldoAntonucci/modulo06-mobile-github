import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({
    host: '192.168.2.200',
    port: 9090,
  })
    .useReactNative()
    .connect();

  // eslint-disable-next-line no-console
  console.tron = tron;

  tron.clear();
}
