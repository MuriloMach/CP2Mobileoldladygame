import Home from './Home';
import Game from './Game';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const AuthNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Game" component={Game}/>
        </Stack.Navigator>
    )
}

export default AuthNavigator;