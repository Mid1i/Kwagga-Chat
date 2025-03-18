import { reactive, onMounted, onUnmounted } from "vue";
import { Client, IMessage, IFrame } from "@stomp/stompjs";


const useStomp = (brokerURL: string, destination: string, subscribe: string) => {
  const messages = reactive<string[]>([]);
  const errors = reactive<IMessage[]>([]);
  
  let stompClient: Client;


	const sendMessage = (message: string) => {
    if (!stompClient || !stompClient.connected) return;
    
    stompClient.publish({ 
			destination, 
			headers: { "recepient-id": "" },
			body: JSON.stringify({ message }) 
		});
  };

  const onConnect = () => {
    console.log("Connected to STOMP");

    // Подписываемся на чат с пользователем
    stompClient.subscribe(subscribe, message => messages.push(message.body));

    // Подписываемся на ошибки
    stompClient.subscribe(`/user/.../errors`, error => errors.push(error));
  };

  const onDisconnect = () => {
    console.log("Disconnected from STOMP");
  };

  const onStompError = (error: IFrame) => {
    console.log(error)
  };


  onMounted(() => {
    stompClient = new Client({
      brokerURL: brokerURL,
			connectHeaders: { Authorization: `Bearer ` },
      reconnectDelay: 100000,
      onConnect,
      onDisconnect,
			onStompError
    });

    stompClient.activate();
  });

  onUnmounted(() => stompClient.deactivate());


  return { 
    errors,
		messages, 
		sendMessage 
	}
};

export default useStomp;
