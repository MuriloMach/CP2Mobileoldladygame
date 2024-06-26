import Login from './Login';
import Cadastro from './Cadastro';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const NotAuthNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Navigator>
    )
}

export default NotAuthNavigator;