import type { ComputedRef, Ref } from '#imports'
import { computed, useRuntimeConfig, watch } from '#imports'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { namespace } from '../../configs'

interface Room {
    name: string
    channel: string
    roomId: string
}

interface SocketOptions {
    room: Room
    user: string
    debug?: boolean
}

const jointRooms = new Set<string>()

export const useSocketIo = (
    input: Ref<SocketOptions> | ComputedRef<SocketOptions>,
) => {
    const runtimeConfig: any = useRuntimeConfig()
    const { debug, user } = input.value
    const room = computed<Room>(() => input.value.room)

    // Initialize the socket connection
    const socket: Socket = io(
        runtimeConfig.public[namespace].socketEndPoint + room.value.channel,
        {
            forceNew: false,
            reconnection: true,
        },
    )

    const joinRoom = (newRoom?: Room) => {
        const currentRoom = newRoom || room.value
        const roomKey = currentRoom.roomId

        if (debug)
            console.log(
                `[socket] jointRooms has ${roomKey}: ${jointRooms.has(roomKey)}`,
            )

        if (!jointRooms.has(roomKey)) {
            jointRooms.add(roomKey)
            socket.emit(
                'join',
                {
                    room: roomKey,
                    user: user,
                },
                (ack: any) => {
                    if (debug)
                        console.log(`[socket] join room: ${roomKey} `, ack)
                },
            )
        }
    }

    const leaveRoom = (oldRoom?: Room) => {
        const currentRoom = oldRoom || room.value
        const roomKey = currentRoom.roomId

        jointRooms.delete(roomKey)
        if (debug) console.log(`[socket] leaveRoom ${roomKey}`)
        socket.emit('leave', {
            room: roomKey,
            user,
        })
    }

    const setupSocketListeners = () => {
        socket.on('connect', () => {
            joinRoom()
            if (debug) console.log('[socket] connect: ', socket.id)
        })

        const errorEvents = [
            'connect_error',
            'connect_timeout',
            'reconnect',
            'reconnect_attempt',
            'reconnecting',
            'reconnect_error',
            'reconnect_failed',
        ]

        errorEvents.forEach((event) => {
            socket.on(event, (err: any) => {
                console.error(`[socket] ${event}`, err)
            })
        })
    }

    setupSocketListeners()

    // Watch for room changes and handle them
    watch(room, (newRoom, oldRoom) => {
        if (debug) console.log('[socket] room changed', newRoom)
        if (oldRoom) leaveRoom(oldRoom)
        joinRoom(newRoom)
    })

    // Explicitly define return type
    return {
        joinRoom,
        leaveRoom,
        socket,
    } as {
        joinRoom: (newRoom?: Room) => void
        leaveRoom: (oldRoom?: Room) => void
        socket: Socket
    }
}
