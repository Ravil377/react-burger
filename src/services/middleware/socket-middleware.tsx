import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState, TWS } from '../../utils/chema';
import { TWSActions } from '../reducers/socket';

export const socketMiddleware = (wsActions: TWS): Middleware => {

    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let connected = false;

        return next => (action: TWSActions) => {
            const { dispatch } = store;
            const { type } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit && !connected) {
                socket = new WebSocket(action.payload);
            }

            if (socket) {
                connected = true;

                socket.onopen = (event) => {
                    dispatch({ type: onOpen, payload: event });
                }

                socket.onerror = (event) => {
                    dispatch({ type: onError, payload: event });
                }

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: onMessage, payload: parsedData });
                }

                socket.onclose = (event) => {
                    dispatch({ type: onClose, payload: event });
                }
            }

			if (type === onClose) {
				socket?.close(1000, 'socket closed');
				connected = false;
			}

            next(action);
        };

    }) as Middleware;

}