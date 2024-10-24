import type { ComputedRef, Ref } from '#imports'
import { computed, useRuntimeConfig, watch } from '#imports'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

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

// Singleton instance và cache cho socket connections
class SocketManager {
    private static instance: SocketManager
    private sockets: Map<string, Socket> = new Map()
    private jointRooms: Set<string> = new Set()

    private constructor() {}

    public static getInstance(): SocketManager {
        if (!SocketManager.instance) {
            SocketManager.instance = new SocketManager()
        }
        return SocketManager.instance
    }

    public getSocket(channel: string, endpoint: string): Socket {
        if (!this.sockets.has(channel)) {
            const socket = io(endpoint + channel, {
                forceNew: false,
                reconnection: true,
            })
            this.sockets.set(channel, socket)
        }
        return this.sockets.get(channel)!
    }

    public isRoomJoined(roomKey: string): boolean {
        return this.jointRooms.has(roomKey)
    }

    public addJointRoom(roomKey: string): void {
        this.jointRooms.add(roomKey)
    }

    public removeJointRoom(roomKey: string): void {
        this.jointRooms.delete(roomKey)
    }
}

export const useSocketIo = (
    input: Ref<SocketOptions> | ComputedRef<SocketOptions>,
) => {
    const runtimeConfig: any = useRuntimeConfig()
    const { debug, user } = input.value
    const room = computed<Room>(() => input.value.room)

    // Get singleton instance
    const socketManager = SocketManager.getInstance()

    // Get or create socket connection
    const socket = socketManager.getSocket(
        room.value.channel,
        runtimeConfig.public.socketEndPoint,
    )

    const joinRoom = (newRoom?: Room) => {
        const currentRoom = newRoom || room.value
        const roomKey = currentRoom.roomId

        if (debug) {
            console.log(
                `[socket] jointRooms has ${roomKey}: ${socketManager.isRoomJoined(roomKey)}`,
            )
        }

        if (!socketManager.isRoomJoined(roomKey)) {
            socketManager.addJointRoom(roomKey)
            socket.emit(
                'join',
                {
                    room: roomKey,
                    user: user,
                },
                (ack: any) => {
                    if (debug) {
                        console.log(`[socket] join room: ${roomKey} `, ack)
                    }
                },
            )
        }
    }

    const leaveRoom = (oldRoom?: Room) => {
        const currentRoom = oldRoom || room.value
        const roomKey = currentRoom.roomId

        socketManager.removeJointRoom(roomKey)
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

    watch(room, (newRoom, oldRoom) => {
        if (debug) console.log('[socket] room changed', newRoom)
        if (oldRoom) leaveRoom(oldRoom)
        joinRoom(newRoom)
    })

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
