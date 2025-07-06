import { DashboardSpeed02Icon, Home07Icon, SpoonAndForkIcon, UserIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Tabs } from 'expo-router';
import colors from '../../shared/colors';

export default function _layout() {
    return (
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: colors.WHITE,
                    tabBarStyle: {
                        backgroundColor: '#1a1a1a',
                        borderTopWidth: 0,
                        elevation: 0,
                    },
                    headerShown: false
                }}
            >

                <Tabs.Screen name='Home'
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return <HugeiconsIcon
                                icon={Home07Icon}
                                size={size}
                                color={color}
                                variant="stroke"
                            />
                        }
                    }}
                />
                <Tabs.Screen name='Appetite'
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return <HugeiconsIcon
                                icon={SpoonAndForkIcon}
                                size={size}
                                color={color}
                                variant="stroke"
                            />
                        }
                    }}
                />
                <Tabs.Screen name='Score'
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return <HugeiconsIcon
                                icon={DashboardSpeed02Icon}
                                size={20}
                                color={color}
                                variant="stroke"
                            />
                        }
                    }}
                />
                <Tabs.Screen name='About'
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return <HugeiconsIcon
                                icon={UserIcon}
                                size={size}
                                color={color}
                                variant="stroke"
                            />
                        }
                    }}
                />

            </Tabs>
    )
}